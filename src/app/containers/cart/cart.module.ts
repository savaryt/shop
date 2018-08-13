import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,

    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [CartComponent]
})
export class CartModule { }
