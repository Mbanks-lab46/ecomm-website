import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Product } from '../../services/product';
import { Products } from '../../types/product.interface';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  private productService = inject(Product);
  private route = inject(ActivatedRoute);
  products = signal<Products[]>([]);
  filteredProducts = signal<Products[]>([]);
  searchQuery = signal<string>('');
  
  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products.set(data);
      this.filteredProducts.set(data);
    });

    this.route.queryParams.subscribe(params => {
      const query = params['search'] || '';
      this.searchQuery.set(query);
      this.filterProducts(query);
    })
  }

  filterProducts(query: string) {
    if (!query.trim()) {
      this.filteredProducts.set(this.products());
      return;
    }
    const lower = query.toLowerCase();
    this.filteredProducts.set(
      this.products().filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
      )
    );
  }

 
}
