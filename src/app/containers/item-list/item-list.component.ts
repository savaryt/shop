import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DatabaseItem } from '../../item/item.model';

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
  ) {
  }

  ngOnInit() {
    this.items = this.route.params.pipe(switchMap(({ sex }) => {
      return this.firestore
        .collection('sex')
        .doc(sex)
        .collection<DatabaseItem>('items')
        .snapshotChanges()
        .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)));
    }))
  }

}
