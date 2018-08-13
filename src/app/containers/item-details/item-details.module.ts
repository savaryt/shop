import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemDetailsRoutingModule } from './item-details-routing.module';
import { ItemDetailsComponent } from './item-details.component';
import { ItemCardComponent } from './item-card/item-card.component';

import { ImageSelectorModule } from '../../components/image-selector/image-selector.module';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatDividerModule,
  MatChipsModule,
  MatTooltipModule,
  MatSelectModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItemDetailsRoutingModule,

    ImageSelectorModule,

    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  declarations: [ItemDetailsComponent, ItemCardComponent]
})
export class ItemDetailsModule { }
