import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackMessage } from '../../../services/feedback-message.model';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent {

  sizeForm: { value: any, valid: boolean } = { value: {}, valid: false };
  imageForm: { value: any, valid: boolean } = { value: {}, valid: false };
  itemForm: { value: any, valid: boolean } = { value: {}, valid: false };
  attributeForm: { value: any, valid: boolean } = { value: {}, valid: true };

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private feedback: FeedbackService,
  ) { }

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
