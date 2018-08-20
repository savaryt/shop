import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Item, DatabaseItem } from '../../../item/item.model';
import { AddItem } from '../../../item/item.actions';
import { ActivatedRoute } from '@angular/router';
import { first, switchMap, mergeMap, tap, scan, debounceTime, map } from 'rxjs/operators';
import { getStoreId } from '../../../utilities';
import { AngularFirestore } from '../../../../../node_modules/angularfire2/firestore';
import { AngularFireStorage } from '../../../../../node_modules/angularfire2/storage';
import { Observable, of, from } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: DatabaseItem;
  form: FormGroup;
  images: Observable<string[]>;
  image: string;

  constructor(
    private store: Store<Item>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      size: ['', Validators.required],
    });

    this.images = this.route.params
      .pipe(switchMap(({ sex, id }) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items')
          .doc(id)
          .collection('pictures')
          .valueChanges()
          .pipe(first())
          .pipe(switchMap(pictures => {
            return from(pictures)
              .pipe(mergeMap(picture => this.storage.ref(picture.src).getDownloadURL()))
              .pipe(map(url => ({ src: url, alt: 'product_picture' })))
          }))
          .pipe(debounceTime(100))
          .pipe(scan((acc, curr) => [...acc, curr], []))
          .pipe(tap(console.log))
      }));
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

  onSelectedImageChange(image: string) {
    this.image = image;
  }


}
