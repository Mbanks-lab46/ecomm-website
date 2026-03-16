import { Component, inject, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth.service.ts';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class Checkout {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  cartService = inject(CartService);
  authService = inject(AuthService);

  loading = signal<boolean>(false);
  error = signal<string>('');
  orderPlaced = signal<boolean>(false);

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],

    cardName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    expiryDate: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
  });

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get address() { return this.form.get('address'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get zipCode() { return this.form.get('zipCode'); }
  get cardName() { return this.form.get('cardName'); }
  get cardNumber() { return this.form.get('cardNumber'); }
  get expiryDate() { return this.form.get('expiryDate'); }
  get cvv() { return this.form.get('cvv'); }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const user = this.authService.currentUser;
    const cartItems = this.cartService.cartItems;

    const order = {
      userId: user?.id,
      status: 'Pending',
      orderItems: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.price
      }))
    };

    this.http.post(`${environment.apiUrl}/orders`, order).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.orderPlaced.set(true);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Something went wrong placing your order. Please try again.');
        this.loading.set(false);
      }
    });
  }
}