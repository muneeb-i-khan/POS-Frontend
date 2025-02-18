import { Component, OnInit, inject } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { OrderService, Order } from '../../services/order.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgFor],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  private orderService = inject(OrderService);

  columns = [
    { header: 'Order ID', field: 'id' },
    { header: 'Order Date', field: 'orderDate' },
    { header: 'Total Amount', field: 'totalAmount' }
  ];

  data: Order[] = [];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.data = orders.map(order => ({
          ...order,
          isEditing: false
        }));
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  editRow(index: number) {
    console.log('Edit row', index);
  }

  deleteRow(index: number) {
    console.log('Delete row', index);
  }
}

