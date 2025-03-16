import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:9000/pos/api/order';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/paginated?page=0&pageSize=15`, {
      withCredentials: true
    });
  }

  postOrder(order: Order): Observable<Order> {
    console.log('Sending Order:', order); 
    return this.http.post<Order>(this.apiUrl, order, {
      withCredentials: true
    });
  }

  downloadInvoice(orderId: number) {
    window.open(`${this.apiUrl}/download/${orderId}`, '_blank');
  }

  getOrdersPaginated(page: number, pageSize: number): Observable<{ orders: Order[], totalOrders: number }> {
    return this.http.get<Order[]>(`${this.apiUrl}/paginated?page=${page}&pageSize=${pageSize}`, { 
      observe: 'response',
      withCredentials: true
    }).pipe(
      map(response => {
        const totalOrders = Number(response.headers.get('totalOrders')) || 0;
        return { orders: response.body || [], totalOrders };
      })
    );
  }
}