import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemListRoutingModule } from './item-list-routing.module';
import { ItemListComponent } from './item-list.component';
import { ItemCardComponent } from './item-card/item-card.component';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatDividerModule,
  MatChipsModule,
  MatTooltipModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ItemListRoutingModule,

    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  declarations: [ItemListComponent, ItemCardComponent],
  exports: [ItemListComponent]
})
export class ItemListModule { }
