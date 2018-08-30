import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from '../../item/item.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, concat, of, from } from 'rxjs';
import { map, tap, switchMap, merge, concatAll, mergeAll, scan, mergeMap, first, debounceTime } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent implements OnInit {

    item: Observable<DatabaseItem>;
    sizes: Observable<{ id, label, stock }[]>;
    attributes: Observable<{ id, label, color }[]>;

    constructor(
        private route: ActivatedRoute,
        private firestore: AngularFirestore,
        private storage: AngularFireStorage,
    ) {
    }

    ngOnInit() {
        const item = this.route.params
            .pipe(switchMap(({ sex, id }) => {
                return this.firestore
                    .collection('sex')
                    .doc(sex)
                    .collection<DatabaseItem>('items')
                    .doc(id)
                    .snapshotChanges()
                    .pipe(map(change => ({ id: change.payload.id, ...change.payload.data() }) as DatabaseItem));
            }));


        const sizes = this.route.params
            .pipe(switchMap(({ sex, id }) => {
                return this.firestore
                    .collection('sex')
                    .doc(sex)
                    .collection<DatabaseItem>('items')
                    .doc(id)
                    .collection('sizes')
                    .snapshotChanges()
                    .pipe(map(changes => changes
                        .map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as { id, label, stock })
                    ));
            }));
        const attributes = this.route.params
            .pipe(switchMap(({ sex, id }) => {
                return this.firestore
                    .collection('sex')
                    .doc(sex)
                    .collection<DatabaseItem>('items')
                    .doc(id)
                    .collection('attributes')
                    .snapshotChanges()
                    .pipe(map(changes => changes
                        .map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() }) as { id, label, color })
                    ));
            }));

        const pictures = this.route.params
            .pipe(switchMap(({ sex, id }) => {
                return this.firestore
                    .collection('sex')
                    .doc(sex)
                    .collection<DatabaseItem>('items')
                    .doc(id)
                    .collection('pictures')
                    .snapshotChanges()
                    .pipe(map(changes => changes
                        .map(change => ({ id: change.payload.doc.id, ...change.payload.doc.data() } as { id, src, alt }))
                    ))
                    .pipe(first())
                    .pipe(switchMap(_pictures => {
                        return from(_pictures)
                            .pipe(mergeMap(picture => this.storage
                                .ref(picture.src)
                                .getDownloadURL()
                                .pipe(map(url => ({ id: picture.id, src: url, alt: picture.alt })))
                            ));
                    }))
                    .pipe(scan((acc, curr: { id, src, alt }) => [...acc, curr], []))
                    .pipe(debounceTime(100));
            }));

        this.item = item.pipe(switchMap(_item => {
            return pictures.pipe(switchMap(_pictures => {
                return attributes.pipe(switchMap(_attributes => {
                    return sizes.pipe(map(_sizes => {
                        _item.sizes = _sizes;
                        _item.attributes = _attributes;
                        _item.pictures = _pictures;
                        return _item;
                    }));
                }));
            }));
        }));
        this.item.subscribe(console.log)
    }

}
