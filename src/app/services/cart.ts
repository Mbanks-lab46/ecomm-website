import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem } from '../types/cart.interface';
import { Products } from '../types/product.interface';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'cart';
  private cartSubject = new BehaviorSubject<CartItem[]>(
    this.loadFromStorage()
  );
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();
  cartCount$: Observable<number> = this.cart$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );
  cartTotal$: Observable<number> = this.cart$.pipe(
    map(items =>
      items.reduce((total, item) =>
        total + item.product.price * item.quantity, 0)
    )
  );

  get cartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  private loadFromStorage(): CartItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(items: CartItem[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private emit(items: CartItem[]) {
    this.cartSubject.next(items);
    this.saveToStorage(items);
  }

  addToCart(product: Products, quantity: number = 1) {
    const items = [...this.cartItems];
    const existing = items.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.emit(items);
  }

  increaseQuantity(productId: number) {
    const items = this.cartItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    this.emit(items);
  }

  decreaseQuantity(productId: number) {
    const items = this.cartItems
      .map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);
    this.emit(items);
  }

  removeItem(productId: number) {
    const items = this.cartItems.filter(i => i.product.id !== productId);
    this.emit(items);
  }

  clearCart() {
    this.emit([]);
  }
}
