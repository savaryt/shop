import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Item, DatabaseItem } from '../../../item/item.model';
import { AddItem } from '../../../item/item.actions';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { first } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: DatabaseItem;
  form: FormGroup;
  images: { src: string, alt: string }[] = [];
  image: { src: string, alt: string } = { src: 'string', alt: 'string' };

  constructor(
    private store: Store<Item>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      size: ['', Validators.required],
    });
  }

  onSubmit() {
    const { sex } = this.route.snapshot.params;
    const { size } = this.form.value;
    const id = `${this.item.id}-${size}`;
    const price = this.item.price - this.item.sale;
    const item = new Item(id, this.item.label, 1, price, this.item.sizes, size, sex);
    this.add(item);
  }

  add(item: Item) {
    const action = new AddItem({ item });
    this.store.dispatch(action);
  }

  onSelectedImageChange(image: { src: string, alt: string }) {
    this.image = image;
  }


}
