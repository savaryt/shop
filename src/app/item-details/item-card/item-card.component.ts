import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IItem, Item, IDatabaseItem } from '../../item/item.model';
import { AddItem } from '../../item/item.actions';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: IDatabaseItem;
  form: FormGroup;

  constructor(
    private store: Store<IItem>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      size: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onSubmit() {
    const { size, quantity } = this.form.value;
    const id = `${this.item.id}-${size}`;
    const price = this.item.price - this.item.sale;
    const item = new Item(id, this.item.label, quantity, price, this.item.sex, size);
    this.add(item);
  }

  add(item: IItem) {
    const action = new AddItem({ item });
    this.store.dispatch(action);
  }


}
