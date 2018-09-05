import { Component, AfterViewInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/dynamic-field/field-config.interface';
import { Validators } from '@angular/forms';
import { throttleTime, startWith } from 'rxjs/operators';
import * as cuid from 'cuid';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements AfterViewInit {

  @Output() valueChange = new EventEmitter();

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @Input() config: FieldConfig[];

  constructor() {
    this.config = [
      {
        type: 'imageInput',
        name: `image-${cuid()}`,
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
    const imageInput = {
      type: 'imageInput',
      name: `image-${cuid()}`,
      placeholder: 'Image',
      validation: [Validators.required]
    };
    this.config = [...this.config, imageInput];
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
