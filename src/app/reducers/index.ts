import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromItem from '../item/item.reducer';

export interface State {
  item: fromItem.State;
}

export const reducers: ActionReducerMap<State> = {
  item: fromItem.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
