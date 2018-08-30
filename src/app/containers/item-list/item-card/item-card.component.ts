import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from '../../../item/item.model';
import { AngularFirestore } from '../../../../../node_modules/angularfire2/firestore';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { switchMap, tap, first, map, delay, retry } from '../../../../../node_modules/rxjs/operators';
import { AngularFireStorage } from '../../../../../node_modules/angularfire2/storage';
import { Observable } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent implements OnInit {

  @Input() item: DatabaseItem;

  constructor(
  ) { }

  ngOnInit() {

  }

}
