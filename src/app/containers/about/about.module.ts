import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,

    FlexLayoutModule,

    MatCardModule,
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
