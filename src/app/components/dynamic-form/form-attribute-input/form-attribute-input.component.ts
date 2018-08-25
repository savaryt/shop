import { Component } from '@angular/core';
import { Field } from '../dynamic-field/field.interface';
import { FieldConfig } from '../dynamic-field/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({

  selector: 'app-form-attribute-input',
  templateUrl: './form-attribute-input.component.html',
  styleUrls: ['./form-attribute-input.component.scss']
})
export class FormAttributeInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
