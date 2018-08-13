import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ItemActionTypes } from './item.actions';
import { tap, map, switchMap, concat, } from 'rxjs/operators';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackMessage } from '../services/feedback-message.model';
import { Item } from './item.model';
import { Store } from '@ngrx/store';
import { selectAll, selectEntities, selectIds } from './item.reducer';
import * as localforage from 'localforage';

@Injectable()
export class ItemEffects {

  constructor(
    private actions: Actions,
    private feedback: FeedbackService,
    private store: Store<Item>,
  ) { }

  @Effect({ dispatch: false }) save = this.actions
    .pipe(switchMap(() => this.store.select(selectAll)))
    .pipe(map(items => localforage.setItem('cart', items)));

  // @todo nofity if already in cart & qty > stock
  @Effect({ dispatch: false }) add = this.actions
    .pipe(ofType(ItemActionTypes.AddItem))
    .pipe(map(({ payload }: { payload }) => {
      const { item } = payload;
      this.feedback.message.next(new FeedbackMessage(`${item.label} added to cart`));
    }));

  @Effect({ dispatch: false }) delete = this.actions
    .pipe(ofType(ItemActionTypes.DeleteItem))
    .pipe(map(() => {
      this.feedback.message.next(new FeedbackMessage(`Item removed from cart`));
    }));

  @Effect({ dispatch: false }) clear = this.actions
    .pipe(ofType(ItemActionTypes.ClearItems))
    .pipe(map(() => {
      this.feedback.message.next(new FeedbackMessage(`Cart cleared`));
    }));


}
