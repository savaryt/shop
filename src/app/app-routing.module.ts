import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: 'men',
    loadChildren: './item-list/item-list.module#ItemListModule'
  },
  {
    path: 'women',
    loadChildren: './item-list/item-list.module#ItemListModule'
  },
  {
    path: 'unisex',
    loadChildren: './item-list/item-list.module#ItemListModule'
  },
  {
    path: 'sales',
    loadChildren: './item-list/item-list.module#ItemListModule'
  },
  {
    path: 'cart',
    loadChildren: './cart/cart.module#CartModule'
  },
  {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckoutModule'
  },
  {
    path: 'details',
    loadChildren: './item-details/item-details.module#ItemDetailsModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
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
