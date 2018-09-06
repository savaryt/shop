import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap, first } from 'rxjs/operators';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { AngularFirestore } from 'angularfire2/firestore';
import * as localforage from 'localforage';

import { Store } from '@ngrx/store';
import { Item, DatabaseItem } from './item/item.model';
import { selectTotal, State } from './item/item.reducer';
import { LoadItems } from './item/item.actions';
import { men } from './mock/item.mock';
import { FeedbackService } from './services/feedback.service';
import { FeedbackMessage } from './services/feedback-message.model';

import { MatSnackBar, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navLinks = [
    {
      label: 'Men',
      path: '/items/men',
      icon: 'chevron_right',
      disabled: false
    },
    {
      label: 'Women',
      path: '/items/women',
      icon: 'chevron_right',
      disabled: false
    },
    {
      label: 'Unisex',
      path: '/items/unisex',
      icon: 'chevron_right',
      disabled: false
    },
    {
      label: 'Cart',
      path: '/cart',
      icon: 'shopping_cart',
      disabled: false
    },
    {
      label: 'Contact',
      path: '/contact',
      icon: 'contact_support',
      disabled: false
    },
    {
      label: 'About',
      path: '/about',
      icon: 'info',
      disabled: false
    },
    {
      label: 'Admin',
      path: '/admin',
      icon: 'chevron_right',
      disabled: false
    }
  ];
  isMobile: Observable<boolean>;
  isMobileStatic: boolean;
  count: Observable<number>;
  @ViewChild(MatSidenav) sidenav;

  constructor(
    private media: ObservableMedia,
    private store: Store<Item>,
    private snackbar: MatSnackBar,
    private feedback: FeedbackService,
    private firestore: AngularFirestore,
  ) {
    const settings = { timestampsInSnapshots: true };
    firestore.firestore.settings(settings);

    this.isMobile = this.media.asObservable()
      .pipe(map((change: MediaChange) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          return this.isMobileStatic = true;
        } else {
          return this.isMobileStatic = false;
        }
      }))

    this.count = this.store.select(selectTotal);

    localforage.getItem('cart')
      .then((items: Item[]) => {
        if (items) {
          this.store.dispatch(new LoadItems({ items }));
        }
      });

    this.feedback.message.subscribe((feedbackMessage: FeedbackMessage) => {
      this.openSnackBar(feedbackMessage.message, feedbackMessage.action);
    });

    // men.map(item => {
    //   this.firestore
    //     .collection('sex')
    //     .doc('men')
    //     .collection<DatabaseItem>('items')
    //     .add(item);
    // });
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

  noop() {
    return;
  }
}
