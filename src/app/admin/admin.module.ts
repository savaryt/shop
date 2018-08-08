import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,

    FlexLayoutModule,

    MatButtonModule,

  ],
  declarations: [AdminComponent, DashboardComponent]
})
export class AdminModule { }
