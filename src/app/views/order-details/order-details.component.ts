import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { OrderService, OrderItem } from '../../services/order.service';

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
        const order = orders.find(o => o['id'] === this.orderId);
        if (order) {
          this.items = order.items;
        }
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }
}
