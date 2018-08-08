import { Component, OnInit } from '@angular/core';
import { IDatabaseItem } from '../item/item.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item: Observable<IDatabaseItem>;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.item = this.firestore.collection<IDatabaseItem>('items').doc<IDatabaseItem>(id)
      .snapshotChanges()
      .pipe(map(change => ({ id: change.payload.id, ...change.payload.data() }) as IDatabaseItem));
  }

}
