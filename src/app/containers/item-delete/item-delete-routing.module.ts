import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDeleteComponent } from './item-delete.component';

const routes: Routes = [
  {
    path: '',
    component: ItemDeleteComponent,
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
export class ItemDeleteRoutingModule { }