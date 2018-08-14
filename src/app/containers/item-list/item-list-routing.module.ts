import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list.component';

const routes: Routes = [
  {
    path: ':sex',
    component: ItemListComponent,
  },
  {
    path: ':sex/:id',
    loadChildren: './containers/item-details/item-details.module#ItemDetailsModule'
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
export class ItemListRoutingModule { }
