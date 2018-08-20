import { Component } from '@angular/core';
import { Field } from '../dynamic-field/field.interface';
import { FieldConfig } from '../dynamic-field/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
