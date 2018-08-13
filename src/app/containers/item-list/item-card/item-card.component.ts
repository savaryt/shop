import { Component, OnInit, Input } from '@angular/core';
import { DatabaseItem } from '../../../item/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() item: DatabaseItem;

  constructor(
  ) { }

  ngOnInit() {
  }

}
