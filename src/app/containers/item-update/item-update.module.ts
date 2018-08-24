import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemUpdateRoutingModule } from './item-update-routing.module';
import { ItemUpdateComponent } from './item-update.component';

import { SizeFormModule } from '../../components/size-form/size-form.module';
import { ImageFormModule } from '../../components/image-form/image-form.module';
import { ItemFormModule } from '../../components/item-form/item-form.module';
import { AttributeFormModule } from '../../components/attribute-form/attribute-form.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ItemUpdateRoutingModule,

    SizeFormModule,
    ImageFormModule,
    ItemFormModule,
    AttributeFormModule,

    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ItemUpdateComponent]
})
export class ItemUpdateModule { }
