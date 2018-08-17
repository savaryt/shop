import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../dynamic-field/field-config.interface';
import { Field } from '../dynamic-field/field.interface';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
