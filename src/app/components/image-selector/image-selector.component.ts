import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {

  selected: { src: string, alt: string };
  selectedIndex: number;
  @Input() images: { src: string, alt: string }[] = [];
  @Output() selectedChange: EventEmitter<{ src: string, alt: string }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.select(0);
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
    if (this.images.length - 1 >= index && index >= 0) {
      this.selectedIndex = index;
      this.selected = this.images[this.selectedIndex];
      this.selectedChange.emit(this.selected);
      console.log(this.selected);
    }
  }

}
