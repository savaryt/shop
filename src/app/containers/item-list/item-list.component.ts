import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable, BehaviorSubject, from, of, combineLatest, pipe } from 'rxjs';
import { map, switchMap, mergeMap, scan, first, debounceTime, tap, withLatestFrom } from 'rxjs/operators';

import { DatabaseItem, Sex } from '../../item/item.model';
import { AngularFireStorage } from 'angularfire2/storage';

export type OrderByDirection = 'asc' | 'desc';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {

  orderBy = [
    { label: 'Price', value: 'total' },
    { label: 'Date', value: 'createdAt', selected: true },
  ];

  items: Observable<DatabaseItem[]>;
  order = new BehaviorSubject<string>('createdAt');
  direction = new BehaviorSubject<OrderByDirection>('asc');
  sex: Observable<Sex>;
  start = new BehaviorSubject<any>(0);
  combined: Observable<[Sex, string, OrderByDirection, any]>;

  last: Observable<any>;
  first: Observable<any>;

  cursorStart: any = 0;
  cursorEnd: any;
  cursorHistory;
  page;
  length = 3;

  previousDisabled: boolean;
  nextDisabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit() {
    this.sex = this.route.params.pipe(map(params => params.sex));
    this.combined = combineLatest(this.sex, this.order, this.direction, this.start);
    this.setFirst();
    this.setLast();

    this.items = this.combined
      .pipe(switchMap(([sex, order, direction, start]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, direction).startAt(start))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap((item: DatabaseItem) => this.getPicture(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => sort(items, order, direction)))
              .pipe(tap(items => {
                this.cursorHistory = [];
                this.cursorHistory.push(items[0][order]);
                this.page = 0;
                this.cursorStart = this.cursorHistory[this.page];
                this.cursorEnd = items[items.length - 1][order];
                console.log(this.page, this.cursorHistory)
                this.previousDisabled = true;
                this.nextDisabled = false;
              }));
          }));
      }));
  }

  next() {
    this.cursorStart = this.cursorHistory[this.page];
    this.page++;
    this.items = this.combined
      .pipe(switchMap(([sex, order, direction]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, direction).startAfter(this.cursorEnd))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap((item: DatabaseItem) => this.getPicture(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => sort(items, order, direction)))
              .pipe(switchMap(items => {
                if (this.page >= this.cursorHistory.length && this.cursorHistory.indexOf(items[0][order] === -1)) {
                  this.cursorHistory.push(items[0][order]);
                }
                this.cursorEnd = items[items.length - 1][order];
                console.log(this.page, this.cursorHistory, this.cursorStart);

                return this.last
                  .pipe(map(last => {
                    if (items[items.length - 1][order] === last) {
                      this.nextDisabled = true;
                      this.previousDisabled = false;
                    } else {
                      this.nextDisabled = false;
                    }
                    return items;
                  }));
              }));
          }));
      }));
  }

  previous() {
    this.page--;
    this.cursorStart = this.cursorHistory[this.page];
    this.items = this.combined
      .pipe(switchMap(([sex, order, direction]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, direction).startAt(this.cursorStart))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap((item: DatabaseItem) => this.getPicture(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => sort(items, order, direction)))
              .pipe(switchMap(items => {
                this.cursorEnd = items[items.length - 1][order];
                console.log(this.page, this.cursorHistory, this.cursorStart);
                return this.first
                  .pipe(map(_first => {
                    if (items[0][order] === _first) {
                      this.previousDisabled = true;
                      this.nextDisabled = false;
                    } else {
                      this.previousDisabled = false;
                    }
                    return items;
                  }));
              }));
          }));
      }));
  }

  getPicture(item: DatabaseItem, sex: Sex): Observable<DatabaseItem> {
    return this.firestore
      .collection('sex')
      .doc(sex)
      .collection<DatabaseItem>('items')
      .doc(item.id)
      .collection('pictures')
      .valueChanges()
      .pipe(switchMap(pictures => {
        if (pictures.length) {
          const firstPicture = pictures.find(picture => picture.alt === 'picture-0')
          return this.storage
            .ref(firstPicture.src)
            .getDownloadURL()
            .pipe(map(url => {
              return { src: url, alt: pictures[0].alt };
            }));
        } else {
          return of({ src: '', alt: 'no_picture' });
        }
      }))
      .pipe(map(_picture => {
        item.picture = _picture;
        return item;
      }))
  }

  onOrderByChange(event: { value, source }) {
    const { value } = event;
    this.items = this.combined
      .pipe(switchMap(([sex, order, direction, start]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, direction).startAt(start))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap((item: DatabaseItem) => this.getPicture(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => sort(items, order, direction)))
              .pipe(tap(items => {
                this.cursorHistory = [];
                this.cursorHistory.push(items[0][order]);
                this.page = 0;
                this.cursorStart = this.cursorHistory[this.page];
                this.cursorEnd = items[items.length - 1][order];
                console.log(this.page, this.cursorHistory)

                this.previousDisabled = true;
                this.nextDisabled = false;
              }))
          }));
      }))
    this.order.next(value);
    this.setFirst();
    this.setLast();
    this.setCursor();
  }
  onDirectionChange(event: { value, source }) {
    const { value } = event;

    this.items = this.combined
      .pipe(switchMap(([sex, order, direction, start]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, direction).startAt(start))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap((item: DatabaseItem) => this.getPicture(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => sort(items, order, direction)))
              .pipe(tap(items => {
                this.cursorHistory = [];
                this.cursorHistory.push(items[0][order]);
                this.page = 0;
                this.cursorStart = this.cursorHistory[this.page];
                this.cursorEnd = items[items.length - 1][order];
                console.log(this.page, this.cursorHistory)

                this.previousDisabled = true;
                this.nextDisabled = false;
              }));
          }));
      }))
    this.direction.next(value);
    this.setFirst();
    this.setLast();
    this.setCursor();
  }

  setCursor() {
    let start;
    this.combined
      .pipe(first())
      .subscribe(([sex, order, direction]) => {
        switch (order) {
          case 'createdAt': {
            if (direction === 'asc') {
              start = 0;
            } else {
              start = Date.now();
            }
          }
            break;
          case 'total': {
            if (direction === 'asc') {
              start = `${0}-${Date.now()}`;
            } else {
              start = `${Infinity}-${Date.now()}`;
            }
          }
            break;
        }
        this.start.next(start);
      })
  }

  setFirst() {
    this.first = this.combined
      .pipe(switchMap(([sex, order, direction]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(1).orderBy(order, direction))
          .valueChanges()
          .pipe(map(items => items[0][order]));
      }));
  }
  setLast() {
    this.last = this.combined
      .pipe(switchMap(([sex, order, direction]) => {
        let realDirection;
        if (direction === 'asc') {
          realDirection = 'desc';
        } else {
          realDirection = 'asc';
        }
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(1).orderBy(order, realDirection))
          .valueChanges()
          .pipe(map(items => items[0][order]))
      }));
  }
}

const sort = (items: DatabaseItem[], order, direction) => {
  return [...items]
    .sort((a, b) => {
      if (direction === 'asc') {
        return a[order] >= b[order] ? a[order] > b[order] ? 1 : 0 : -1;
      } else {
        return a[order] >= b[order] ? a[order] > b[order] ? -1 : 0 : 1;
      }
    });
}