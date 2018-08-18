import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemAddComponent } from './item-add.component';
import { ItemAddRoutingModule } from './item-add-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

import { SizeFormModule } from '../../../components/size-form/size-form.module';
import { ImageFormModule } from '../../../components/image-form/image-form.module';
import { ItemFormModule } from '../../../components/item-form/item-form.module';


@NgModule({
  imports: [
    CommonModule,
    ItemAddRoutingModule,

    SizeFormModule,
    ImageFormModule,
    ItemFormModule,

    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ItemAddComponent],
  exports: [ItemAddComponent]
})
export class ItemAddModule { }
