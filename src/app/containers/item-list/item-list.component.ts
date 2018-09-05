import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable, from, of, Subject, BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { map, switchMap, delay, retry, scan, mergeMap, concatMap, first, debounceTime, tap, concatAll, withLatestFrom } from 'rxjs/operators';

import { DatabaseItem, Sex } from '../../item/item.model';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {

  items: Observable<DatabaseItem[]>;
  order = new BehaviorSubject<string>('createdAt');
  sex: Observable<Sex>;
  combined: Observable<[Sex, string]>;

  last: Observable<any>;
  first: Observable<any>;

  cursorStart: any = 1;
  cursorEnd: any;
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
    this.combined = combineLatest(this.sex, this.order);

    this.first = this.combined
      .pipe(switchMap(([sex, order]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(1).orderBy(order, 'asc'))
          .valueChanges()
          .pipe(map(items => items[0][order]));
      }));
    this.last = this.combined
      .pipe(switchMap(([sex, order]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(1).orderBy(order, 'desc'))
          .valueChanges()
          .pipe(map(items => items[0][order]));
      }));

    this.items = this.combined
      .pipe(switchMap(([sex, order]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, 'asc').startAfter(this.cursorStart))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap(item => this.getPictures(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => items.sort((a, b) => a[order] >= b[order] ? a[order] > b[order] ? 1 : 0 : -1)))
              .pipe(tap(items => {
                this.cursorEnd = items[items.length - 1][order];
                this.cursorStart = items[0][order];
                this.previousDisabled = true;
              }));
          }));
      }));
  }

  next() {
    this.items = this.combined
      .pipe(switchMap(([sex, order]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, 'asc').startAfter(this.cursorEnd))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap(item => this.getPictures(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => items.sort((a, b) => a[order] >= b[order] ? a[order] > b[order] ? 1 : 0 : -1)))
              .pipe(switchMap(items => {
                this.cursorEnd = items[items.length - 1][order];
                this.cursorStart = items[0][order];
                return this.last
                  .pipe(map(last => {
                    console.log(items[items.length - 1][order], last)
                    if (items[items.length - 1][order] === last) {
                      console.log('last')
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
    this.items = this.combined
      .pipe(switchMap(([sex, order]) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items', ref => ref.limit(this.length).orderBy(order, 'asc').endBefore(this.cursorStart))
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap(item => this.getPictures(item, sex)))
              .pipe(scan((acc, curr) => [...acc, curr], []))
              .pipe(debounceTime(100))
              .pipe(map((items: DatabaseItem[]) => items.sort((a, b) => a[order] >= b[order] ? a[order] > b[order] ? 1 : 0 : -1)))
              .pipe(switchMap(items => {
                this.cursorEnd = items[items.length - 1][order];
                this.cursorStart = items[0][order];
                return this.first
                  .pipe(map(first => {
                    if (items[0][order] === first) {
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

  getPictures(item: DatabaseItem, sex: Sex): Observable<DatabaseItem> {
    return this.firestore
      .collection('sex')
      .doc(sex)
      .collection<DatabaseItem>('items')
      .doc(item.id)
      .collection('pictures')
      .valueChanges()
      .pipe(switchMap(pictures => {
        if (pictures && pictures[0]) {
          return this.storage
            .ref(pictures[0].src)
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
}
