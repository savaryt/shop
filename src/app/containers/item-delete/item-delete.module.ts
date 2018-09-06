import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDeleteComponent } from './item-delete.component';
import { ItemDeleteRoutingModule } from './item-delete-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ItemDeleteRoutingModule,

    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
  ],
  declarations: [ItemDeleteComponent]
})
export class ItemDeleteModule { }
