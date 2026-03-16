import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { Products } from '../../types/product.interface';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private productService = inject(Product);
  featuredProducts = signal<Products[]>([]);

  categories = [
    {
      name: 'Shoes',
      image: 'https://picsum.photos/seed/shoes/600/400',
      link: '/products?search=shoes'
    },
    {
      name: 'Tops',
      image: 'https://picsum.photos/seed/tops/600/400',
      link: '/products?search=tee'
    },
    {
      name: 'Bottoms',
      image: 'https://picsum.photos/seed/bottoms/600/400',
      link: '/products?search=shorts'
    },
    {
      name: 'Hoodies',
      image: 'https://picsum.photos/seed/hoodies/600/400',
      link: '/products?search=hoodie'
    }
  ];

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.featuredProducts.set(data.slice(0, 4));
    });
  }

}
