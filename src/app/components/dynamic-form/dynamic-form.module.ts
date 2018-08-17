import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';

import { FormInputComponent } from './form-input/form-input.component';

import {
  MatInputModule,
} from '@angular/material';
import { FormNumberInputComponent } from './form-number-input/form-number-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatInputModule,
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,

    FormInputComponent,
    FormNumberInputComponent,
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormInputComponent,
    FormNumberInputComponent,

  ]
})
export class DynamicFormModule { }
