import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../dynamic-field/field-config.interface';
import { Field } from '../dynamic-field/field.interface';

@Component({

  selector: 'app-form-size-input',
  templateUrl: './form-size-input.component.html',
  styleUrls: ['./form-size-input.component.scss']
})
export class FormSizeInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
