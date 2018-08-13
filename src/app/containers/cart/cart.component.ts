import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IItem } from '../../item/item.model';
import { UpdateItem, DeleteItem, ClearItems } from '../../item/item.actions';
import { selectAll } from '../../item/item.reducer';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Observable<IItem[]>;
  total: Observable<number>;
  isMobilePortrait: boolean;

  constructor(
    private store: Store<IItem>,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = this.store.select(selectAll);
    this.total = this.items
      .pipe(map((items: IItem[]) => {
        return items
          .reduce((acc, item: IItem) => {
            acc += item.price * item.quantity;
            return acc;
          }, 0);
      }));

  }

  addQuantity(item: IItem) {
    const { id, quantity } = item;
    this.update({ id, quantity: quantity + 1 });
  }
  removeQuantity(item: IItem) {
    const { id, quantity } = item;
    if (quantity > 1) {
      this.update({ id, quantity: quantity - 1 });
    }
  }

  update(item: Partial<IItem>) {
    const { id, ...changes } = item;
    const action = new UpdateItem({ item: { id, changes } });
    this.store.dispatch(action);
  }

  remove(item: Partial<IItem>) {
    const { id } = item;
    const action = new DeleteItem({ id });
    this.store.dispatch(action);
  }

  clear() {
    const action = new ClearItems();
    this.store.dispatch(action);
  }

  navigate(item: IItem) {
    const parts = item.id.split('-');
    const dbId = parts[0];
    this.router.navigate(['details', dbId]);
  }

  hasEnoughStock(item: IItem) {
    const size = item.id.split('-')[1];
    const selectedSize = (item.availableSizes as { size: string, stock: number }[]).find(x => x.size === size);
    return selectedSize.stock >= item.quantity + 1;
  }
}
