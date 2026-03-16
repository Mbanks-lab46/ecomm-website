import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList)},
    {path: 'products', loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList)},
    {path: 'products/:id', loadComponent: () => import('./components/product-detail/product-detail').then(m => m.ProductDetail)},
    {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/cart/cart')
        .then(m => m.Cart)
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./components/auth/login/login')
        .then(m => m.Login)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./components/auth/register/register')
        .then(m => m.Register)
  },
   {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/orders/orders')
        .then(m => m.Orders)
  },
  {
  path: 'checkout',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./components/checkout/checkout')
      .then(m => m.Checkout)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/non-found/non-found')
        .then(m => m.NonFound)
  }
];
