import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackMessage } from '../../services/feedback-message.model';
import { FieldConfig } from '../../components/dynamic-form/dynamic-field/field-config.interface';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
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

  item: AngularFirestoreDocument<DatabaseItem>;
  id: string;

  isSubmitting: boolean;

  sizeForm: { value: any, valid: boolean };
  imageForm: { value: any, valid: boolean };
  itemForm: { value: any, valid: boolean };
  attributeForm: { value: any, valid: boolean };


  sizeFormConfig: Observable<FieldConfig[]>;
  imageFormConfig: Observable<FieldConfig[]>;
  itemFormConfig: Observable<any>;
  attributeFormConfig: Observable<FieldConfig[]>;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private feedback: FeedbackService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const { sex, id } = this.route.snapshot.params;
    this.id = id;
    this.item = this.firestore
      .collection('sex')
      .doc(sex)
      .collection('items')
      .doc<DatabaseItem>(id);

    this.attributeFormConfig = this.item
      .collection('attributes')
      .valueChanges()
      .pipe(map(attributes => {
        return attributes
          .map((attribute, index) => {
            return {
              type: 'attribute',
              name: `label-${index}`,
              value: attribute
            };
          })
          .reduce((acc, curr) => [...acc, curr], []);
      }));

    this.sizeFormConfig = this.item
      .collection('sizes')
      .valueChanges()
      .pipe(map(sizes => {
        return sizes
          .map((size, index) => {
            return {
              type: 'size',
              name: `size-${index}`,
              value: size
            };
          })
          .reduce((acc, curr) => [...acc, curr], []);
      }));


    this.itemFormConfig = this.item
      .valueChanges()
      .pipe(map(({ description, label, price, sale }) => {
        return { description, label, price, sale, sex };
      }));

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
            .pipe(switchMap(url => {
              const promise = fetch(url)
                .then(res => res.blob())
                .then(blob => {
                  const reader = new FileReader();
                  return new Promise((resolve, reject) => {
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                      resolve({ src: reader.result, alt: picture.alt });
                    };
                  });
                });
              return from(promise);
            }))))
      }))
      .pipe(scan((acc, curr) => [...acc, curr], []))
      .pipe(map((pictures: any[]) => {
        return pictures
          .map((picture, index) => {
            return [
              {
                type: 'imageInput',
                name: `image-${index}`,
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
      this.isSubmitting = true;
      const sizes = [];
      for (const property in this.sizeForm.value) {
        if (this.sizeForm.value.hasOwnProperty(property)) {
          sizes.push(this.sizeForm.value[property]);
        }
      }

      const attributes = [];
      for (const property in this.attributeForm.value) {
        if (this.attributeForm.value.hasOwnProperty(property)) {
          attributes.push(this.attributeForm.value[property]);
        }
      }

      const images = [];
      for (const property in this.imageForm.value) {
        if (this.imageForm.value.hasOwnProperty(property)) {
          images.push(this.imageForm.value[property]);
        }
      }


      const { sex, price, sale, ...values } = this.itemForm.value;
      const { id } = this.route.snapshot.params;
      this.firestore
        .collection('sex')
        .doc(sex)
        .collection('items')
        .doc(id)
        .update({ ...values, price, sale, total: `${price - sale}-${Date.now()}` })
        .then(() => {
          if (!images.length) {
            this.isSubmitting = false;
            throw new Error('At least one picture is mandatory');
          }
          if (!sizes.length) {
            this.isSubmitting = false;
            throw new Error('At least one size is mandatory');
          }

          const removePicturesPromise = this.firestore
            .collection('sex')
            .doc(sex)
            .collection('items')
            .doc(id)
            .collection('pictures')
            .ref
            .get()
            .then(({ docs }) => {
              const batch = this.firestore.firestore.batch();
              docs.forEach(doc => batch.delete(doc.ref));

              return batch.commit().then(() => this.storage.ref(`sex/${sex}/items/${id}`).delete());
            });

          const picturesPromises = images
            .map((image, index) => {
              return fetch(image.src)
                .then(response => response.blob())
                .then(blob => this.storage.upload(`sex/${sex}/items/${id}/${index}`, blob))
                .then(({ ref }) => {
                  return this.firestore
                    .collection('sex')
                    .doc(sex)
                    .collection('items')
                    .doc(id)
                    .collection('pictures')
                    .add({ src: ref.fullPath, alt: `picture-${index}` });
                });
            });

          const removeSizesPromise = this.firestore
            .collection('sex')
            .doc(sex)
            .collection('items')
            .doc(id)
            .collection('sizes')
            .ref
            .get()
            .then(({ docs }) => {
              const batch = this.firestore.firestore.batch();
              docs.forEach(doc => batch.delete(doc.ref));
              return batch.commit();
            });

          const removeAttributesPromise = this.firestore
            .collection('sex')
            .doc(sex)
            .collection('items')
            .doc(id)
            .collection('attributes')
            .ref
            .get()
            .then(({ docs }) => {
              const batch = this.firestore.firestore.batch();
              docs.forEach(doc => batch.delete(doc.ref));
              return batch.commit();
            });

          const sizesPromises = sizes
            .map(size => {
              return this.firestore
                .collection('sex')
                .doc(sex)
                .collection('items')
                .doc(id)
                .collection('sizes')
                .add(size);
            });
          const attributesPromises = attributes
            .map(attribute => {
              return this.firestore
                .collection('sex')
                .doc(sex)
                .collection('items')
                .doc(id)
                .collection('attributes')
                .add(attribute)
            });
          return Promise
            .all([...sizesPromises, ...attributesPromises, ...picturesPromises])
            .then(() => Promise.all([removeSizesPromise, removeAttributesPromise, removePicturesPromise]));
        })
        .then(() => {
          this.isSubmitting = false;
          this.router.navigate(['/items', sex, id])
        })
        .then(() => {
          this.feedback.message.next(new FeedbackMessage('Item added'))
        })
        .catch((error) => {
          this.isSubmitting = false;
          this.feedback.message.next(new FeedbackMessage(error.message));
        });

    } else {
      console.log(`
      size: ${this.sizeForm.valid}
      img : ${this.imageForm.valid}
      item: ${this.itemForm.valid}
      attr: ${this.attributeForm.valid}
      `)
      this.feedback.message.next(new FeedbackMessage('Invalid form'))
    }
  }
}
