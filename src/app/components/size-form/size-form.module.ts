import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeFormComponent } from './size-form.component';
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
  declarations: [SizeFormComponent],
  exports: [SizeFormComponent],
})
export class SizeFormModule { }
