import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDatabaseItem } from '../../item/item.model';
import { items } from '../../mock/item.mock';
import { Sex } from '../../item/item.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items: Observable<IDatabaseItem[]>;
  headline: string | Sex;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
  ) {
  }

  ngOnInit() {

    this.items = this.firestore
      .collection<IDatabaseItem>('items')
      .snapshotChanges()
      .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as IDatabaseItem)));

    // Filter sex by route instead of dupplicating component
    const paths = this.router.url.split('/').filter(path => path !== '');

    switch (paths[0]) {
      case 'men':
        this.items = this.items.pipe(map(_items => _items.filter(item => item.sex === 'men')));
        break;
      case 'women':
        this.items = this.items.pipe(map(_items => _items.filter(item => item.sex === 'women')));
        break;
      case 'unisex':
        this.items = this.items.pipe(map(_items => _items.filter(item => item.sex === 'unisex')));
        break;
      case 'sales':
        this.items = this.items.pipe(map(_items => _items.filter(item => item.sale > 0)));
        break;
      default: break;
    }
    this.headline = paths[0];
  }

}
