import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFormComponent } from './image-form.component';

import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

import { MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,

    DynamicFormModule,

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [ImageFormComponent],
  exports: [ImageFormComponent],
})
export class ImageFormModule { }
