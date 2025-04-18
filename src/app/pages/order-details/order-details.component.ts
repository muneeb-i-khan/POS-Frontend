import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem } from '../../types/order.type';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  
  orderId!: number;
  items: OrderItem[] = [];

  ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        const order: Order | undefined = orders.find(o => o.id === this.orderId);
        
        if (order) {
          this.items = order['items'];
        }
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }

  truncateValue(value: any): string {
    const str = value?.toString() || '';
    if (str.length > 16) {
      return `${str.slice(0, 3)}...${str.slice(-3)}`;
    }
    return str;
  }
}