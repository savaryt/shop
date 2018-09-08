import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable, of, from, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, DatabaseItem, Size } from '../../item/item.model';
import { UpdateItem, DeleteItem, ClearItems, LoadItems } from '../../item/item.actions';
import { selectAll } from '../../item/item.reducer';
import { map, switchMap, mergeMap, first, filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { uniqBy } from 'lodash';
import { getDbId } from '../../utilities';

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
            const dbId = getDbId(id);
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
          .pipe(map(change => change.payload.id));
      }));

    // watchedEntities.subscribe(console.log)

    this.autoStockUpdateSub = watchedEntities
      .pipe(switchMap((dbId) => {

        return this.store
          .select(selectAll)
          .pipe(first())
          .pipe(mergeMap((items: Item[]) => {
            return from(items)
              .pipe(filter((item: Item) => {
                const _dbId = getDbId(item.id);
                return dbId === _dbId;
              }))
              .pipe(switchMap((item: Item) => {
                return this.firestore
                  .collection('sex')
                  .doc(item.sex)
                  .collection('items')
                  .doc(getDbId(item.id))
                  .collection('sizes')
                  .snapshotChanges()
                  .pipe(map(changes => changes.map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }))))
                  .pipe(map((sizes: Size[]) => ({ sizes, item })));
              }))
              .pipe(map(({ sizes, item }: { sizes: Size[], item: Item }) => {

                const size = sizes.find(s => s.label === item.size);
                if (size) {
                  if (size.stock > 0) {
                    if (item.quantity > size.stock) {
                      const { id } = item;
                      const changes = { quantity: size.stock, sizes };
                      const action = new UpdateItem({ item: { id, changes } });
                      this.store.dispatch(action);
                    } else {
                      const { id } = item;
                      const changes = { sizes };
                      const action = new UpdateItem({ item: { id, changes } });
                      this.store.dispatch(action);
                    }
                  } else {
                    this.remove(item);
                  }
                } else {
                  // Not user friendly, find another way
                  const action = new DeleteItem({ id: item.id });
                  this.store.dispatch(action);
                }
                return size;
              }));
          }));
      }))
      .subscribe();

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

  remove(item: Item) {
    const { id } = item;
    const action = new DeleteItem({ id });
    this.store.dispatch(action);
  }

  clear() {
    const action = new ClearItems();
    this.store.dispatch(action);
  }

  navigate(item: Item) {
    const dbId = getDbId(item.id)
    this.router.navigate(['items', item.sex, dbId]);
  }

  hasEnoughStock(item: Item) {
    const size = item.id.split('-')[1];
    const selectedSize = item.sizes.find(x => x.label === size);
    return selectedSize.stock >= item.quantity + 1;
  }
}
