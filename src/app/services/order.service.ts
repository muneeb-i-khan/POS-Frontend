import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  barcode: string;
  quantity: number;
  prodName?: string;
}

export interface Order {
  id?: number;
  items: OrderItem[];
  orderDate: string;
  totalAmount?: number;
  isEditing?: boolean;
  [key: string]: any;
}

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
    console.log(order.items); 
    return this.http.post<Order>(this.apiUrl, order.items); 
  }
  
}
