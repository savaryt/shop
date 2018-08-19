import { Component, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/dynamic-field/field-config.interface';
import { Validators } from '@angular/forms';
import { throttleTime } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements AfterViewInit {

  @Output() valueChange = new EventEmitter();

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  config: FieldConfig[];

  constructor() {
    this.config = [];
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
    const id = this.config.filter(input => input.type === 'imageInput').length;
    const imageInput = {
      type: 'imageInput',
      name: `image-${id}`,
      placeholder: 'Image',
      validation: [Validators.required]
    };
    this.config = [...this.config, imageInput];
  }

  removeInput() {
    const id = this.config.filter(input => input.type === 'ImageInput').length - 1;
    this.config = this.config
      .filter(input => input.name !== `image-${id}`);
  }
}
