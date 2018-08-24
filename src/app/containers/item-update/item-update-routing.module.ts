import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemUpdateComponent } from './item-update.component';

const routes: Routes = [
  {
    path: '',
    component: ItemUpdateComponent,
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
export class ItemUpdateRoutingModule { }
