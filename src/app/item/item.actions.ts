import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IItem } from './item.model';
import { State } from './item.reducer';

export enum ItemActionTypes {
  LoadItems = '[Item] Load Items',
  AddItem = '[Item] Add Item',
  UpsertItem = '[Item] Upsert Item',
  AddItems = '[Item] Add Items',
  UpsertItems = '[Item] Upsert Items',
  UpdateItem = '[Item] Update Item',
  UpdateItems = '[Item] Update Items',
  DeleteItem = '[Item] Delete Item',
  DeleteItems = '[Item] Delete Items',
  ClearItems = '[Item] Clear Items',
  SetState = '[Item] Set State'
}

export class LoadItems implements Action {
  readonly type = ItemActionTypes.LoadItems;

  constructor(public payload: { items: IItem[] }) { }
}

export class AddItem implements Action {
  readonly type = ItemActionTypes.AddItem;

  constructor(public payload: { item: IItem }) { }
}

export class UpsertItem implements Action {
  readonly type = ItemActionTypes.UpsertItem;

  constructor(public payload: { item: IItem }) { }
}

export class AddItems implements Action {
  readonly type = ItemActionTypes.AddItems;

  constructor(public payload: { items: IItem[] }) { }
}

export class UpsertItems implements Action {
  readonly type = ItemActionTypes.UpsertItems;

  constructor(public payload: { items: IItem[] }) { }
}

export class UpdateItem implements Action {
  readonly type = ItemActionTypes.UpdateItem;

  constructor(public payload: { item: Update<IItem> }) { }
}

export class UpdateItems implements Action {
  readonly type = ItemActionTypes.UpdateItems;

  constructor(public payload: { items: Update<IItem>[] }) { }
}

export class DeleteItem implements Action {
  readonly type = ItemActionTypes.DeleteItem;

  constructor(public payload: { id: string }) { }
}

export class DeleteItems implements Action {
  readonly type = ItemActionTypes.DeleteItems;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearItems implements Action {
  readonly type = ItemActionTypes.ClearItems;
}

export class SetState implements Action {
  readonly type = ItemActionTypes.SetState;

  constructor(public payload: { state: State }) { }
}

export type ItemActions =
  LoadItems
  | AddItem
  | UpsertItem
  | AddItems
  | UpsertItems
  | UpdateItem
  | UpdateItems
  | DeleteItem
  | DeleteItems
  | ClearItems
  | SetState;
