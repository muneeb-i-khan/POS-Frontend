import { Component, OnInit, inject , Input, Output, EventEmitter} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, SearchBarComponent],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  private orderService = inject(OrderService);

  @Input() totalItems: number = 0;
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChange = new EventEmitter<number>();


  columns = [
    { header: 'Order ID', field: 'id' },
    { header: 'Order Date', field: 'orderDate' },
    { header: 'Total Amount', field: 'totalAmount' },
    {header: 'Customer Name', field: 'customerName'},
    {header: 'Customer Phone', field: 'customerPhone'}
  ];

  data: Order[] = [];
  searchQuery: string = '';
  searchField: string = '';
  startDate: string = '';
  endDate: string = '';



  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(page: number = 0) {
    this.orderService.getOrdersPaginated(page, this.pageSize).subscribe({
      next: (response) => {
        this.data = response.orders.map(order => ({
          ...order,
          orderDate: this.formatDate(order.orderDate)
        }));
        this.totalItems = response.totalOrders;
        this.currentPage = page;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  private formatDate(dateObj: any): string {
    if (!dateObj) return '';
    return `${dateObj.year}-${String(dateObj.monthValue).padStart(2, '0')}-${String(dateObj.dayOfMonth).padStart(2, '0')}`;
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

  downloadInvoice(orderId: number) {
    this.orderService.downloadInvoice(orderId);
  }

  goToPage(page: number) {
    this.loadOrders(page);
  }
}
