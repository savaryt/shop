import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable, of, from, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, DatabaseItem } from '../../item/item.model';
import { UpdateItem, DeleteItem, ClearItems, LoadItems } from '../../item/item.actions';
import { selectAll, selectIds } from '../../item/item.reducer';
import { map, switchMap, tap, mergeMap, concatMap, scan, throttleTime, debounceTime, reduce, first, concat, merge } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { uniqBy } from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {

  items: Observable<Item[]>;
  isMobilePortrait: boolean;
  autoStockUpdateSub: Subscription;

  constructor(
    private store: Store<Item>,
    private router: Router,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.items = this.store.select(selectAll);


    const uids = this.store.select(selectAll)
      .pipe(first())
      .pipe(switchMap((items: Item[]) => {
        const _items = items
          .map(item => {
            const { id, sex } = item;
            const dbId = id.split('-')[0];
            return { id: dbId, sex };
          });
        return uniqBy(_items, 'id');
      }));

    const watchedEntities = uids
      .pipe(mergeMap(({ id, sex }) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection('items')
          .doc(id)
          .snapshotChanges()
          .pipe(map(change => ({ id: change.payload.id, ...change.payload.data() })))
      }));

    this.autoStockUpdateSub = watchedEntities
      .pipe(switchMap((dbItem: DatabaseItem) => {

        return this.store
          .select(selectAll)
          .pipe(first())
          .pipe(map(items => {
            return items
              .filter(x => {
                const _dbId = x.id.split('-')[0];
                return dbItem.id === _dbId;
              })
              .map(item => {

                const size = dbItem.sizes.find(x => x.label === item.size);
                if (size.stock > 0) {
                  if (item.quantity > size.stock) {
                    const { id: _id, ...rest } = item;
                    const changes = { quantity: size.stock, sizes: dbItem.sizes };
                    const action = new UpdateItem({ item: { id: _id, changes } });
                    this.store.dispatch(action);
                  } else {
                    const { id: _id, ...rest } = item;
                    const changes = { sizes: dbItem.sizes };
                    const action = new UpdateItem({ item: { id: _id, changes } });
                    this.store.dispatch(action);
                  }
                } else {
                  this.remove({ id: item.id });
                }

                return item;
              });
          }));
      }))
      .subscribe(console.log);

  }

  ngOnDestroy() {
    this.autoStockUpdateSub.unsubscribe();
  }

  addQuantity(item: Item) {
    const { id, quantity, ...rest } = item;
    this.update({ id, quantity: quantity + 1, ...rest });
  }
  removeQuantity(item: Item) {
    const { id, quantity, ...rest } = item;
    if (quantity > 1) {
      this.update({ id, quantity: quantity - 1, ...rest });
    }
  }

  update(item: Item) {
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
