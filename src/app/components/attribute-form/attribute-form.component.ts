import { Component, AfterViewInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/dynamic-field/field-config.interface';
import { throttleTime } from 'rxjs/operators';
import * as cuid from 'cuid';

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
        type: 'attribute',
        name: `attribute-0`,
        value: { label: 'Hot', color: 'primary' }
      },
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
    const attribute = {
      type: 'attribute',
      name: `attribute-${cuid()}`,
      value: { label: null, color: 'primary' }
    };
    this.config = [...this.config, attribute];
  }

  removeInput() {
    this.config.pop();
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
