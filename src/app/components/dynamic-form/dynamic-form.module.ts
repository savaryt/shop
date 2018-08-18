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
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormImageInputComponent } from './form-image-input/form-image-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatInputModule,
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
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormInputComponent,
    FormNumberInputComponent,
    FormImageInputComponent,
  ]
})
export class DynamicFormModule { }
