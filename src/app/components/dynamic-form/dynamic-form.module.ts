import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';

import { FormInputComponent } from './form-input/form-input.component';
import { FormNumberInputComponent } from './form-number-input/form-number-input.component';

import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatSelectModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormImageInputComponent } from './form-image-input/form-image-input.component';
import { FormSelectComponent } from './form-select/form-select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,

    FormInputComponent,
    FormNumberInputComponent,
    FormImageInputComponent,
    FormSelectComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormInputComponent,
    FormNumberInputComponent,
    FormImageInputComponent,
    FormSelectComponent
  ]
})
export class DynamicFormModule { }
