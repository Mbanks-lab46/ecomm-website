import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product';
import { Products } from '../../types/product.interface';
import { from, Observable } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(Product);
  products: Products[] = [];
  productList$: Observable<Products[]> = this.productService.getAll();

 
}
