import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../../../components/dynamic-form/dynamic-field/field-config.interface';
import { DynamicFormComponent } from '../../../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent {

  constructor() { }

  onSizeFormChange(value) {
    console.log(value);
  }

  onImageFormChange(value) {
    console.log(value);
  }

  onItemFormChange(value) {
    console.log(value);
  }
}
