import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IItem } from './item.model';
import { ItemActions, ItemActionTypes } from './item.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as localforage from 'localforage';

export interface State extends EntityState<IItem> {
  selectedItem: IItem | null;
}

export const adapter: EntityAdapter<IItem> = createEntityAdapter<IItem>();

export const initialState: State = adapter.getInitialState({ selectedItem: null });

export function reducer(
  state = initialState,
  action: ItemActions
): State {
  switch (action.type) {
    case ItemActionTypes.AddItem: {
      if (state.entities[action.payload.item.id]) {
        const entity = state.entities[action.payload.item.id]
        const newEntity = { ...entity, quantity: action.payload.item.quantity + entity.quantity };
        state.entities[action.payload.item.id] = newEntity;
        localforage.setItem('cart', state);
        return state;
      } else {
        const newState = adapter.addOne(action.payload.item, state);
        localforage.setItem('cart', newState);
        return newState;
      }
    }

    case ItemActionTypes.UpsertItem: {
      const newState = adapter.upsertOne(action.payload.item, state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.AddItems: {
      const newState = adapter.addMany(action.payload.items, state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.UpsertItems: {
      const newState = adapter.upsertMany(action.payload.items, state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.UpdateItem: {
      const newState = adapter.updateOne(action.payload.item, state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.UpdateItems: {
      const newState = adapter.updateMany(action.payload.items, state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.DeleteItem: {
      const newState = adapter.removeOne(action.payload.id, state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.DeleteItems: {
      const newState = adapter.removeMany(action.payload.ids, state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.LoadItems: {
      const newState = adapter.addAll(action.payload.items, state);
      localforage.setItem('cart', newState);
      return newState;
    }


    case ItemActionTypes.ClearItems: {
      const newState = adapter.removeAll(state);
      localforage.setItem('cart', newState);
      return newState;
    }

    case ItemActionTypes.SetState: {
      return action.payload.state;
    }

    default: {
      return state;
    }
  }
}

// item state selector
export const selectState = createFeatureSelector<State>('item');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectState);


// selected item id selector
const getSelectedId = (state: State): string => state.selectedItem.id;
export const selectId = createSelector(selectState, getSelectedId);
