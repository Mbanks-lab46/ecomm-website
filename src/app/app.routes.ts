import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { NonFound } from './components/non-found/non-found';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList)},
    {path: 'products', loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList)},
    {path: 'products/:id', loadComponent: () => import('./components/product-detail/product-detail').then(m => m.ProductDetail)},
    {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart')
        .then(m => m.Cart)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login')
        .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register')
        .then(m => m.Register)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/non-found/non-found')
        .then(m => m.NonFound)
  }
];
