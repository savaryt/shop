import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeFormComponent } from './attribute-form.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    DynamicFormModule,

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [AttributeFormComponent],
  exports: [AttributeFormComponent],
})
export class AttributeFormModule { }
