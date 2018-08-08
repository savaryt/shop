import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import * as fromItem from './item.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './item.effects';


import {
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('item', fromItem.reducer),
    EffectsModule.forFeature([ItemEffects])
  ],
})
export class ItemModule { }
