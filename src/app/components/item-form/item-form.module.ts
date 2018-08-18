import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemFormComponent } from './item-form.component';

import { FlexLayoutModule } from '@angular/flex-layout'
import {
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatInputModule,
  ],
  declarations: [ItemFormComponent],
  exports: [ItemFormComponent],
})
export class ItemFormModule { }
