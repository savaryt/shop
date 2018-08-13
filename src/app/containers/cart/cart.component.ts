import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, DatabaseItem } from '../../item/item.model';
import { UpdateItem, DeleteItem, ClearItems, LoadItems } from '../../item/item.actions';
import { selectAll } from '../../item/item.reducer';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {

  items: Item[];
  storeSub: Subscription;
  firestoreSub: Subscription;
  isMobilePortrait: boolean;

  constructor(
    private store: Store<Item>,
    private router: Router,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.firestoreSub = this.firestore.collection<DatabaseItem>('items').snapshotChanges()
      .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as DatabaseItem)))
      .pipe(switchMap(dbItems => this.store.select(selectAll)
        .pipe(map(items => {
          return items.map(item => {
            // ensure real time update of the cart when orders are made concurrently to shopping
            const ref = item.id.split('-')[0];
            const dbItem = dbItems.find(x => x.id === ref);
            item.sizes = dbItem.sizes;
            const size = dbItem.sizes.find(x => x.label === item.size);
            if (size.stock > 0) {
              if (item.quantity > size.stock) {
                this.update({ id: item.id, quantity: size.stock, sizes: dbItem.sizes });
              }
            } else {
              this.remove({ id: item.id });
            }
            return item;
          });
        }))
      ))
      .subscribe();

    this.storeSub = this.store.select(selectAll).subscribe(items => this.items = items);

  }

  ngOnDestroy() {
    this.firestoreSub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  addQuantity(item: Item) {
    const { id, quantity } = item;
    this.update({ id, quantity: quantity + 1 });
  }
  removeQuantity(item: Item) {
    const { id, quantity } = item;
    if (quantity > 1) {
      this.update({ id, quantity: quantity - 1 });
    }
  }

  update(item: Partial<Item>) {
    const { id, ...changes } = item;
    const action = new UpdateItem({ item: { id, changes } });
    this.store.dispatch(action);
  }

  remove(item: Partial<Item>) {
    const { id } = item;
    const action = new DeleteItem({ id });
    this.store.dispatch(action);
  }

  clear() {
    const action = new ClearItems();
    this.store.dispatch(action);
  }

  navigate(item: Item) {
    const parts = item.id.split('-');
    const dbId = parts[0];
    this.router.navigate(['details', dbId]);
  }

  hasEnoughStock(item: Item) {
    const size = item.id.split('-')[1];
    const selectedSize = item.sizes.find(x => x.label === size);
    return selectedSize.stock >= item.quantity + 1;
  }
}
