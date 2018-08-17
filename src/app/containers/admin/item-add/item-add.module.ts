import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemAddComponent } from './item-add.component';
import { DynamicFormModule } from '../../../components/dynamic-form/dynamic-form.module';
import { ItemAddRoutingModule } from './item-add-routing.module';

import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ItemAddRoutingModule,
    DynamicFormModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ItemAddComponent],
  exports: [ItemAddComponent]
})
export class ItemAddModule { }
