import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemFormComponent } from './item-form.component';

import { FlexLayoutModule } from '@angular/flex-layout'
import {
  MatInputModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatInputModule,
    MatSelectModule
  ],
  declarations: [ItemFormComponent],
  exports: [ItemFormComponent],
})
export class ItemFormModule { }
