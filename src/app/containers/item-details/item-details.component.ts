import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from '../../item/item.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'node_modules/rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent implements OnInit {

  item: Observable<DatabaseItem>;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.item = this.firestore.collection<DatabaseItem>('items').doc<DatabaseItem>(id)
      .snapshotChanges()
      .pipe(map(change => ({ id: change.payload.id, ...change.payload.data() }) as DatabaseItem));
  }

}
