import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

// import { AngularFirestore } from 'angularfire2/firestore';
import * as localforage from 'localforage';

import { Store } from '@ngrx/store';
import { IItem, IDatabaseItem } from './item/item.model';
import { items } from './mock/item.mock';
import { selectTotal, selectState, State } from './item/item.reducer';
import { LoadItems, SetState } from './item/item.actions';

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
      path: '/men',
      icon: 'chevron_right',
      disabled: false
    },
    {
      label: 'Women',
      path: '/women',
      icon: 'chevron_right',
      disabled: false
    },
    {
      label: 'Unisex',
      path: '/unisex',
      icon: 'chevron_right',
      disabled: false
    },
    {
      label: 'Sales',
      path: '/sales',
      icon: 'attach_money',
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
      disabled: true
    }
  ];
  isMobile: Observable<boolean>;
  isMobileStatic: boolean;
  count: Observable<number>;
  @ViewChild(MatSidenav) sidenav;

  constructor(
    private media: ObservableMedia,
    private store: Store<IItem>,
    private snackbar: MatSnackBar,
    private feedback: FeedbackService,
    // private firestore: AngularFirestore,
  ) {
    this.isMobile = this.media.asObservable()
      .pipe(map((change: MediaChange) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          return this.isMobileStatic = true;
        } else {
          return this.isMobileStatic = false;
        }
      }))

    this.count = this.store.select(selectTotal);

    localforage.getItem('cart').then((state: State) => {
      if (state) {
        this.store.dispatch(new SetState({ state }));
      }
    });

    this.feedback.message.subscribe((feedbackMessage: FeedbackMessage) => {
      this.openSnackBar(feedbackMessage.message, feedbackMessage.action);
    });

    // items.map(item => {
    //   delete item.id;
    //   this.firestore.collection<IDatabaseItem>('items').add(item);
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
