import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../../../components/dynamic-form/dynamic-field/field-config.interface';
import { DynamicFormComponent } from '../../../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements AfterViewInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  config: FieldConfig[] = [];

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

  addSizeInput() {
    const id = this.config.filter(input => input.type === 'numericInput').length;
    const sizeInput = {
      type: 'numericInput',
      name: `size-${id}`,
      placeholder: 'Stock',
      // validation: [Validators.required]
    };
    this.config = [...this.config, sizeInput]
  }

}
