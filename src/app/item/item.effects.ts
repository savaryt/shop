import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ItemActionTypes } from './item.actions';
import { tap, map, } from 'rxjs/operators';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackMessage } from '../services/feedback-message.model';
import { IItem } from './item.model';

@Injectable()
export class ItemEffects {

  constructor(
    private actions$: Actions,
    private feedback: FeedbackService,
  ) { }

  @Effect({ dispatch: false }) add$ = this.actions$
    .pipe(ofType(ItemActionTypes.AddItem))
    .pipe(tap(console.log))
    .pipe(map((data) => {
      const { payload, type } = data;
      const { item } = payload;
      this.feedback.message.next(new FeedbackMessage(`${item.label} added to cart`));
    }));

  @Effect({ dispatch: false }) delete$ = this.actions$
    .pipe(ofType(ItemActionTypes.DeleteItem))
    .pipe(tap(console.log))
    .pipe(map(() => {
      this.feedback.message.next(new FeedbackMessage(`Item removed from cart`));
    }));

  @Effect({ dispatch: false }) clear$ = this.actions$
    .pipe(ofType(ItemActionTypes.ClearItems))
    .pipe(tap(console.log))
    .pipe(map(() => {
      this.feedback.message.next(new FeedbackMessage(`Cart cleared`));
    }));
}
