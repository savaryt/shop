import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseItem } from '../../item/item.model';
import { items } from '../../mock/item.mock';
import { Sex } from '../../item/item.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {

  items: Observable<DatabaseItem[]>;
  headline: string | Sex;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
  ) {
  }

  ngOnInit() {

    this.items = this.firestore
      .collection<DatabaseItem>('items')
      .snapshotChanges()
      .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)));
  }

}
