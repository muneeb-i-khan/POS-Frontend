import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, SearchBarComponent],
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
  searchQuery: string = '';
  searchField: string = '';
  startDate: string = '';
  endDate: string = '';

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.data = orders;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }


  onSearchChange(event: { field: string; query: string }) {
    this.searchField = event.field;
    this.searchQuery = event.query;
  }

  filteredData() {
    return this.data
      .filter(order => {

        if (this.startDate && this.endDate) {
          const orderDate = new Date(order.orderDate);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          if (orderDate < start || orderDate > end) return false;
        }


        if (!this.searchQuery) return true;

        if (this.searchField) {
          return order[this.searchField]?.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
        }

        return this.columns.some(col => order[col.field]?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()));
      });
  }
}
