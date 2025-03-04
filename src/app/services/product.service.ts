import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:9000/pos/api/product';
  private uploadUrl = 'http://localhost:9000/pos/api/product/upload';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  postProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  uploadProductTSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.uploadUrl, formData);
  }


  getProductsPaginated(page: number, pageSize: number): Observable<{ products: Product[], totalProducts: number }> {
    return this.http.get<Product[]>(`${this.apiUrl}/paginated?page=${page}&pageSize=${pageSize}`, { observe: 'response' })
      .pipe(
        map(response => {
          const totalProducts = Number(response.headers.get('totalProducts')) || 0;
          return { products: response.body || [], totalProducts };
        })
      );
  }
}
