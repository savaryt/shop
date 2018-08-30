import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Item, DatabaseItem } from '../../../item/item.model';
import { AddItem } from '../../../item/item.actions';
import { ActivatedRoute } from '@angular/router';
import { getStoreId } from '../../../utilities';
import { ImageModalComponent } from '../../../components/image-modal/image-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent implements OnInit {
  @Input() item: DatabaseItem;
  form: FormGroup;

  constructor(
    private store: Store<Item>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      size: ['', Validators.required],
    });
  }

  onSubmit() {
    const { sex } = this.route.snapshot.params;
    const { size } = this.form.value;
    const id = getStoreId(this.item.id, size);
    const price = this.item.price - this.item.sale;
    const item = new Item(id, this.item.label, 1, price, this.item.sizes, size, sex);
    this.add(item);
  }

  add(item: Item) {
    const action = new AddItem({ item });
    this.store.dispatch(action);
  }

  isNew(item: DatabaseItem) {
    if (item) {
      const now = Date.now();
      const createdAt = item.createdAt;
      const day = 1000 * 60 * 60 * 24;
      const days = Math.round((now - createdAt) / day);
      return days < 7;
    }
  }

  onSelectedImageClick(image: { src: string, alt: string }) {
    this.dialog.open(ImageModalComponent, { data: { image }, panelClass: 'panel-class' });
  }

}