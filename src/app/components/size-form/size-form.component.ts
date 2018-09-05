import { Component, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/dynamic-field/field-config.interface';
import { Validators } from '@angular/forms';
import { throttleTime, startWith } from '../../../../node_modules/rxjs/operators';
import * as cuid from 'cuid';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss']
})
export class SizeFormComponent implements AfterViewInit {
  @Output() valueChange = new EventEmitter();

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @Input() config: FieldConfig[];

  constructor() {
    this.config = [
      {
        type: 'size',
        name: 'size-0',
        value: { label: 'S', stock: 10 }
      }
    ];
  }

  ngAfterViewInit() {
    this.form.changes
      .pipe(startWith({ value: this.form.value, valid: this.form.valid }))
      .pipe(throttleTime(250))
      .subscribe(() => {
        this.valueChange.emit({
          value: this.form.value,
          valid: this.form.valid
        });
      });
  }

  addInput() {
    const size = {
      type: 'size',
      name: `size-${cuid()}`,
      value: { label: null, stock: null }
    };
    this.config = [...this.config, size];
  }

  removeInput() {
    this.config.pop()
  }

  onRemove(index: number) {
    this.config = this.config
      .filter((control, i) => i !== index)
      .map((control, i) => {
        control.name = `attribute-${cuid()}`;
        return control;
      });
  }
}
