import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemDetailsRoutingModule } from './item-details-routing.module';
import { ItemDetailsComponent } from './item-details.component';
import { ItemCardComponent } from './item-card/item-card.component';

import { ImageSelectorModule } from '../../components/image-selector/image-selector.module';

import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatBadgeModule,
  MatDividerModule,
  MatDialogModule,
  MatIconModule,
  MatSelectModule,
  MatTooltipModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItemDetailsRoutingModule,

    ImageSelectorModule,

    FlexLayoutModule,

    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    ItemDetailsComponent,
    ItemCardComponent,
    ImageModalComponent,
  ],
  entryComponents: [
    ImageModalComponent,
  ]
})
export class ItemDetailsModule { }
