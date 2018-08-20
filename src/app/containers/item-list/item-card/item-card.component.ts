import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from '../../../item/item.model';
import { AngularFirestore } from '../../../../../node_modules/angularfire2/firestore';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { switchMap, tap, first, map } from '../../../../../node_modules/rxjs/operators';
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
  picture: Observable<string>;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.picture = this.route.params
      .pipe(switchMap(({ sex }) => {
        return this.firestore
          .collection('sex')
          .doc(sex)
          .collection<DatabaseItem>('items')
          .doc(this.item.id)
          .collection('pictures')
          .valueChanges()
          .pipe(switchMap(pictures => {
            return this.storage.ref(pictures[0].src).getDownloadURL();
          }));
      }));
  }

}
