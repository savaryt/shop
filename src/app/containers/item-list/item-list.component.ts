import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable, from } from 'rxjs';
import { map, switchMap, delay, retry, scan, mergeMap } from 'rxjs/operators';

import { DatabaseItem } from '../../item/item.model';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {

  items: Observable<DatabaseItem[]>;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit() {
    // const items = this.route.params.pipe(switchMap(({ sex }) => {
    //   return this.firestore
    //     .collection('sex')
    //     .doc(sex)
    //     .collection<DatabaseItem>('items')
    //     .snapshotChanges()
    //     .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)));
    // }))

    this.items = this.route.params
      .pipe(switchMap(({ sex }) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items')
          .snapshotChanges()
          .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
          .pipe(switchMap(_items => {
            return from(_items)
              .pipe(mergeMap(item => {
                return this.firestore
                  .collection('sex')
                  .doc(sex)
                  .collection<DatabaseItem>('items')
                  .doc(item.id)
                  .collection('pictures')
                  .valueChanges()
                  .pipe(switchMap(pictures => {
                    return this.storage
                      .ref(pictures[0].src)
                      .getDownloadURL()
                      .pipe(map(url => {
                        return { src: url, alt: pictures[0].alt };
                      }));
                  }))
                  .pipe(map(_picture => {
                    item.picture = _picture;
                    return item;
                  }));
              }));
          }))
          .pipe(scan((acc, curr) => [...acc, curr], []));
      }));
    this.items.subscribe(console.log)
  }

}
