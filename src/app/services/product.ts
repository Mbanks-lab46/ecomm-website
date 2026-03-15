import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../types/product.interface';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/products`);
  }

  getById(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/products/${id}`);
  }
}
