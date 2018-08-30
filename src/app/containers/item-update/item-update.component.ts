import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackMessage } from '../../services/feedback-message.model';
import { FieldConfig } from '../../components/dynamic-form/dynamic-field/field-config.interface';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Observable, from } from '../../../../node_modules/rxjs';
import { DatabaseItem } from '../../item/item.model';
import { tap, first, map, startWith, switchMap, mergeMap, scan } from '../../../../node_modules/rxjs/operators';
import { Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss']
})
export class ItemUpdateComponent implements OnInit {

  item: Observable<DatabaseItem>;

  sizeForm: { value: any, valid: boolean } = { value: {}, valid: false };
  imageForm: { value: any, valid: boolean } = { value: {}, valid: false };
  itemForm: { value: any, valid: boolean } = { value: {}, valid: false };
  attributeForm: { value: any, valid: boolean } = { value: {}, valid: true };

  sizeFormConfig: Observable<FieldConfig[]>;
  imageFormConfig: Observable<FieldConfig[]>;
  itemFormConfig: Observable<FieldConfig[]>;
  attributeFormConfig: Observable<FieldConfig[]>;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private feedback: FeedbackService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const { sex, id } = this.route.snapshot.params;
    this.item = this.firestore
      .collection('sex')
      .doc(sex)
      .collection('items')
      .doc<DatabaseItem>(id)
      .valueChanges()

    this.attributeFormConfig = this.item
      .pipe(map(item => item.attributes))
      .pipe(map(attributes => {
        return attributes
          .map((attribute, index) => {
            return [
              {
                type: 'textInput',
                name: `label-${index}`,
                placeholder: 'Attribute',
                validation: [Validators.required],
                value: attribute.label
              },
              {
                type: 'select',
                name: `color-${id}`,
                placeholder: 'Color',
                options: [
                  { label: 'Primary', value: 'primary' },
                  { label: 'Accent', value: 'accent' },
                  { label: 'Warn', value: 'warn' },
                ],
                validation: [Validators.required]
              }
            ];
          })
          .reduce((acc, curr) => [...acc, ...curr], []);
      }));

    this.sizeFormConfig = this.item
      .pipe(map(item => item.sizes))
      .pipe(map(sizes => {
        return sizes
          .map((size, index) => {
            return [
              {
                type: 'textInput',
                name: `label-${index}`,
                placeholder: 'Size',
                validation: [Validators.required],
                value: size.label
              },
              {
                type: 'numberInput',
                name: `stock-${index}`,
                placeholder: 'Stock',
                validation: [Validators.required],
                value: size.stock
              }
            ];
          })
          .reduce((acc, curr) => [...acc, ...curr], []);
      }));


    // this.itemFormConfig =
    this.item
      .pipe(map(({ description, label, price, sale }) => {
        return { description, label, price, sale, sex };
      }))
      .subscribe()

    this.imageFormConfig = this.firestore
      .collection('sex')
      .doc(sex)
      .collection('items')
      .doc<DatabaseItem>(id)
      .collection('pictures')
      .valueChanges()
      .pipe(switchMap(pictures => {
        return from(pictures)
          .pipe(mergeMap(picture => this.storage
            .ref(picture.src)
            .getDownloadURL()
            .pipe(map(url => ({ src: url, alt: picture.alt })))));
      }))
      .pipe(scan((acc, curr) => [...acc, curr], []))
      .pipe(map((pictures: any[]) => {
        return pictures
          .map((picture, index) => {
            return [
              {
                type: 'imageInput',
                name: `image-${index}`,
                placeholder: 'Image',
                validation: [Validators.required],
                value: picture
              }
            ];
          })
          .reduce((acc, curr) => [...acc, ...curr], []);
      }));

  }

  onSizeFormChange(value) {
    this.sizeForm = value;
  }

  onImageFormChange(value) {
    this.imageForm = value;
  }

  onItemFormChange(value) {
    this.itemForm = value;
  }
  onAttributeFormChange(value) {
    this.attributeForm = value;
  }

  onSubmit() {
    if (this.sizeForm.valid && this.imageForm.valid && this.itemForm.valid && this.attributeForm.valid) {
      const sizes = [];
      for (const property in this.sizeForm.value) {
        if (this.sizeForm.value.hasOwnProperty(property)) {
          const parts = property.split('-');
          const propertyName = parts[0];
          const index = parts[1];
          if (sizes[index]) {
            sizes[index] = { ...sizes[index], [propertyName]: this.sizeForm.value[property] };
          } else {
            sizes[index] = { [propertyName]: this.sizeForm.value[property] };
          }
        }
      }

      const attributes = [];
      for (const property in this.attributeForm.value) {
        if (this.attributeForm.value.hasOwnProperty(property)) {
          const parts = property.split('-');
          const propertyName = parts[0];
          const index = parts[1];
          if (attributes[index]) {
            attributes[index] = { ...attributes[index], [propertyName]: this.attributeForm.value[property] };
          } else {
            attributes[index] = { [propertyName]: this.attributeForm.value[property] };
          }
        }
      }

      const images = [];
      for (const image in this.imageForm.value) {
        if (this.imageForm.value.hasOwnProperty(image)) {
          const parts = image.split('-');
          const index = parts[1];
          for (const property in this.imageForm.value[image]) {
            if (this.imageForm.value[image].hasOwnProperty(property)) {
              if (images[index]) {
                images[index] = { ...images[index], [property]: this.imageForm.value[image][property] }
              } else {
                images[index] = { [property]: this.imageForm.value[image][property] };
              }
            }
          }
        }
      }

      const { sex, ...values } = this.itemForm.value;
      this.firestore
        .collection('sex')
        .doc(sex)
        .collection('items')
        .add({ sizes, attributes, ...values })
        .then(({ id }) => {
          const promises = images.map((image, index) => {
            fetch(image.src)
              .then(response => response.blob())
              .then(blob => this.storage.upload(`sex/${sex}/items/${id}/${index}`, blob))
              .then(({ ref }) => {
                return this.firestore
                  .collection('sex')
                  .doc(sex)
                  .collection('items')
                  .doc(id)
                  .collection('pictures')
                  .add({ src: ref.fullPath, alt: `picture-${index}` })
              });
          });
          return Promise.all(promises);
        })
        .then(() => {
          this.feedback.message.next(new FeedbackMessage('Item added'))
        })
        .catch((error) => this.feedback.message.next(new FeedbackMessage(error.message)));

    } else {
      this.feedback.message.next(new FeedbackMessage('Invalid form'))
    }
  }

}
