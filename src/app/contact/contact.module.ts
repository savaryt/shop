import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatInputModule,
  MatButtonModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatInputModule,
    MatButtonModule,
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
