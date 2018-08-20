import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/dynamic-field/field-config.interface';
import { Validators } from '@angular/forms';
import { throttleTime } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss']
})
export class SizeFormComponent implements AfterViewInit {
  @Output() valueChange = new EventEmitter();

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  config: FieldConfig[];

  constructor() {
    this.config = [
      {
        type: 'textInput',
        name: `label-0`,
        placeholder: 'Size',
        validation: [Validators.required],
        value: 'S'
      },
      {
        type: 'numberInput',
        name: `stock-0`,
        placeholder: 'Stock',
        validation: [Validators.required],
        value: 10
      }
    ];
  }

  ngAfterViewInit() {
    this.form.changes
      .pipe(throttleTime(250))
      .subscribe(() => {
        this.valueChange.emit({
          value: this.form.value,
          valid: this.form.valid
        });
      });
  }

  addInput() {
    const id = this.config.filter(input => input.type === 'numberInput').length;
    const numberInput = {
      type: 'numberInput',
      name: `stock-${id}`,
      placeholder: 'Stock',
      validation: [Validators.required]
    };
    const textInput = {
      type: 'textInput',
      name: `label-${id}`,
      placeholder: 'Size',
      validation: [Validators.required]
    };
    this.config = [...this.config, textInput, numberInput];
  }

  removeInput() {
    const id = this.config.filter(input => input.type === 'numberInput').length - 1;
    this.config = this.config
      .filter(input => input.name !== `stock-${id}` && input.name !== `label-${id}`);
  }
}
