import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatStepperModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CheckoutRoutingModule,

    FlexLayoutModule,

    MatStepperModule,
    MatInputModule,
    MatButtonModule

  ],
  declarations: [CheckoutComponent]
})
export class CheckoutModule { }
