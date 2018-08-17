import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from '../../item/item.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent implements OnInit {

    item: Observable<DatabaseItem>;

    constructor(
        private route: ActivatedRoute,
        private firestore: AngularFirestore,
    ) {
    }

    ngOnInit() {
        this.item = this.route.params.pipe(switchMap(({ sex, id }) => {
            return this.firestore
                .collection('sex')
                .doc(sex)
                .collection<DatabaseItem>('items')
                .doc(id)
                .snapshotChanges()
                .pipe(map(change => ({ id: change.payload.id, ...change.payload.data() }) as DatabaseItem));
        }))
    }

}
