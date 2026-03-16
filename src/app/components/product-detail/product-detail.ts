import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { Product } from '../../services/product';
import { Products } from '../../types/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(Product);
  private cartService = inject(CartService);

  product = signal<Products | null>(null);
  quantity = signal<number>(1);
  loading = signal<boolean>(true);
  added = signal<boolean>(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe(data => {
      this.product.set(data);
      this.loading.set(false);
    });
  }

  increaseQty() {
    this.quantity.update(q => q + 1);
  }

  decreaseQty() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart() {
    const product = this.product();
    if (!product) return;
    this.cartService.addToCart(product, this.quantity());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1500);
  }
}