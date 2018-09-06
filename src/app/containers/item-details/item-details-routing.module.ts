import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailsComponent } from './item-details.component';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailsComponent,
  },
  {
    path: 'update',
    loadChildren: '../item-update/item-update.module#ItemUpdateModule',
  },
  {
    path: 'delete',
    loadChildren: '../item-delete/item-delete.module#ItemDeleteModule',
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemDetailsRoutingModule { }
