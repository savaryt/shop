import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSelectorComponent } from './image-selector.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,

    FlexLayoutModule,
  ],
  declarations: [ImageSelectorComponent],
  exports: [ImageSelectorComponent]
})
export class ImageSelectorModule { }
