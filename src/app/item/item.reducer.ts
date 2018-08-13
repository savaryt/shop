import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IItem, TShirtSize, ShoeSize } from './item.model';
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
      // manage multiple add of same item of the same size by increasing quantity
      if (state.entities[action.payload.item.id]) {
        const item = state.entities[action.payload.item.id];
        const { id, quantity, availableSizes, size } = item;
        const availableSize = (availableSizes as any[]).find(x => x.size === size)
        if (quantity <= availableSize.stock) {
          const changes = { quantity: quantity + 1 };
          return adapter.updateOne({ id, changes }, state);
        }
      }
      return adapter.addOne(action.payload.item, state);
    }

    case ItemActionTypes.UpsertItem: {
      return adapter.upsertOne(action.payload.item, state);
    }

    case ItemActionTypes.AddItems: {
      return adapter.addMany(action.payload.items, state);
    }

    case ItemActionTypes.UpsertItems: {
      return adapter.upsertMany(action.payload.items, state);
    }

    case ItemActionTypes.UpdateItem: {
      return adapter.updateOne(action.payload.item, state);
    }

    case ItemActionTypes.UpdateItems: {
      return adapter.updateMany(action.payload.items, state);
    }

    case ItemActionTypes.DeleteItem: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ItemActionTypes.DeleteItems: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ItemActionTypes.LoadItems: {
      return adapter.addAll(action.payload.items, state);
    }

    case ItemActionTypes.ClearItems: {
      return adapter.removeAll(state);
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

