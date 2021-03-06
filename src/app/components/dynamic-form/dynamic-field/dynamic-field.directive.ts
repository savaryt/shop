import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, ComponentRef, OnInit, OnChanges, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './field-config.interface';
import { Field } from './field.interface';

import { FormInputComponent } from '../form-input/form-input.component';
import { FormNumberInputComponent } from '../form-number-input/form-number-input.component';
import { FormImageInputComponent } from '../form-image-input/form-image-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormSizeInputComponent } from '../form-size-input/form-size-input.component';
import { FormAttributeInputComponent } from '../form-attribute-input/form-attribute-input.component';

const components: { [type: string]: Type<Field> } = {
  textInput: FormInputComponent,
  numberInput: FormNumberInputComponent,
  imageInput: FormImageInputComponent,
  select: FormSelectComponent,
  size: FormSizeInputComponent,
  attribute: FormAttributeInputComponent
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() config: FieldConfig;

  @Input() group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

}
