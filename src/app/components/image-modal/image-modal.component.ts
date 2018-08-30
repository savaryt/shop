import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface ModalData {
  image: { src: string, alt: string };
}

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData) { }
}
