import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {

  selected: { src: string, alt: string };
  selectedIndex: number;
  @Output() selectedChange: EventEmitter<{ src: string, alt: string }> = new EventEmitter();

  private _images: { src: string, alt: string }[];
  @Input() set images(images: { src: string, alt: string }[]) {
    this._images = images;
    this.select(0);
  }
  get images() {
    return this._images || [];
  }

  constructor() { }

  ngOnInit() {
  }

  previous() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.selected = this.images[this.selectedIndex];
      this.selectedChange.emit(this.selected);
    }
  }

  next() {
    if (this.images.length - 1 > this.selectedIndex) {
      this.selectedIndex++;
      this.selected = this.images[this.selectedIndex];
      this.selectedChange.emit(this.selected);
    }
  }

  select(index: number) {
    if (this.images && this.images.length - 1 >= index && index >= 0) {
      this.selectedIndex = index;
      this.selected = this.images[this.selectedIndex];
      this.selectedChange.emit(this.selected);
    }
  }

}
