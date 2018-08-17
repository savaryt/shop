import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../dynamic-field/field-config.interface';
import { Field } from '../dynamic-field/field.interface';

@Component({
  selector: 'app-form-number-input',
  templateUrl: './form-number-input.component.html',
  styleUrls: ['./form-number-input.component.scss']
})
export class FormNumberInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
