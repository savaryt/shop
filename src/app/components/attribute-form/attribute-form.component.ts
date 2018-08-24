import { Component, AfterViewInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/dynamic-field/field-config.interface';
import { Validators } from '@angular/forms';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.scss']
})
export class AttributeFormComponent implements AfterViewInit {

  @Output() valueChange = new EventEmitter();

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @Input() config: FieldConfig[];

  constructor() {
    this.config = [
      {
        type: 'textInput',
        name: `label-0`,
        placeholder: 'Attribute',
        validation: [Validators.required],
        value: 'Attribute'
      },
      {
        type: 'select',
        name: `color-0`,
        placeholder: 'Color',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Accent', value: 'accent' },
          { label: 'Warn', value: 'warn' },
        ],
        validation: [Validators.required],
        value: 'primary'
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
    const id = this.config.filter(input => input.type === 'textInput').length;
    const attributeInput = {
      type: 'textInput',
      name: `label-${id}`,
      placeholder: 'Attribute',
      validation: [Validators.required]
    };
    const colorInput = {
      type: 'select',
      name: `color-${id}`,
      placeholder: 'Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Accent', value: 'accent' },
        { label: 'Warn', value: 'warn' },
      ],
      validation: [Validators.required]
    };
    this.config = [...this.config, attributeInput, colorInput];
  }

  removeInput() {
    const id = this.config.filter(input => input.type === 'textInput').length - 1;
    this.config = this.config
      .filter(input => input.name !== `label-${id}` && input.name !== `color-${id}`);
  }
}
