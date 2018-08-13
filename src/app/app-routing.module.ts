import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'contact',
    loadChildren: './containers/contact/contact.module#ContactModule'
  },
  {
    path: 'about',
    loadChildren: './containers/about/about.module#AboutModule'
  },
  {
    path: 'men',
    loadChildren: './containers/item-list/item-list.module#ItemListModule'
  },
  {
    path: 'women',
    loadChildren: './containers/item-list/item-list.module#ItemListModule'
  },
  {
    path: 'unisex',
    loadChildren: './containers/item-list/item-list.module#ItemListModule'
  },
  {
    path: 'sales',
    loadChildren: './containers/item-list/item-list.module#ItemListModule'
  },
  {
    path: 'cart',
    loadChildren: './containers/cart/cart.module#CartModule'
  },
  {
    path: 'checkout',
    loadChildren: './containers/checkout/checkout.module#CheckoutModule'
  },
  {
    path: 'details',
    loadChildren: './containers/item-details/item-details.module#ItemDetailsModule'
  },
  {
    path: 'admin',
    loadChildren: './containers/admin/admin.module#AdminModule'
  },
  {
    path: '',
    redirectTo: 'sales',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
