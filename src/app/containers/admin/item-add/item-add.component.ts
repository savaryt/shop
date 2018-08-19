import { Component } from '@angular/core';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent {

  sizeForm: { value: any, valid: boolean };
  imageForm: { value: any, valid: boolean };
  itemForm: { value: any, valid: boolean };

  constructor() { }

  onSizeFormChange(value) {
    this.sizeForm = value;
  }

  onImageFormChange(value) {
    this.imageForm = value;
  }

  onItemFormChange(value) {
    this.itemForm = value;
  }

  onSubmit() {
    if (this.sizeForm.valid && this.imageForm.valid && this.itemForm.valid) {
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

      const images = [];
      for (const property in this.imageForm.value) {
        if (this.imageForm.value.hasOwnProperty(property)) {
          const parts = property.split('-');
          const propertyName = parts[0];
          const index = parts[1];
          if (images[index]) {
            images[index] = { ...images[index], [propertyName]: this.imageForm.value[property] };
          } else {
            images[index] = { [propertyName]: this.imageForm.value[property] };
          }
        }
      }

      console.log({ sizes, images, ...this.itemForm.value });
    }
  }
}
