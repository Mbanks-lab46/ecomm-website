import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service.ts';
import { environment } from '../../../environment/environment';
import { Order, OrderItem } from '../../types/order.interface.js';
@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit{
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  orders = signal<Order[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  expandedOrderId = signal<number | null>(null);

  ngOnInit(): void {
    const userId = this.authService.currentUser?.id;

    this.http.get<Order[]>(`${environment.apiUrl}/orders/user/${userId}`)
      .subscribe({
        next: (data) => {
          this.orders.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load your orders. Please try again.');
          this.loading.set(false);
        }
      });
  }

  toggleOrder(orderId: number) {
    this.expandedOrderId.update(id => id === orderId ? null : orderId);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-success';
      case 'shipped': return 'text-info';
      case 'processing': return 'text-warning';
      case 'cancelled': return 'text-danger';
      default: return 'text-secondary';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-success';
      case 'shipped': return 'bg-info';
      case 'processing': return 'bg-warning';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
