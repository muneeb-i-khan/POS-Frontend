import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:9000/pos/api/order';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  postOrder(order: Order): Observable<Order> {
    console.log('Sending Order:', order); 
    return this.http.post<Order>(this.apiUrl, order); 
  }

  downloadInvoice(orderId: number) {
    window.open(`http://localhost:9000/pos/api/order/download/${orderId}`, '_blank');
  }

  getOrdersPaginated(page: number, pageSize: number): Observable<{ orders: Order[], totalOrders: number }> {
    return this.http.get<{ orders: Order[], totalOrders: number }>(
      `${this.apiUrl}/paginated?page=${page}&pageSize=${pageSize}`
    );
  }
}
