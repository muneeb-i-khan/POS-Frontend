import { Component } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderData {
  orderId: number;
  orderDate: string;
  total: number;
  isEditing: boolean;
  [key: string]: any;  
}

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule],  
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {
  columns = [
    { header: 'Order ID', field: 'orderId' },
    { header: 'Order Date', field: 'orderDate' },
    { header: 'Total', field: 'total' },
    { header: 'Actions', field: 'actions' }
  ];

  data: OrderData[] = [
    { orderId: 1, orderDate: '2025-02-18', total: 100, isEditing: false },
    { orderId: 2, orderDate: '2025-02-19', total: 200, isEditing: false }
  ];

  editRow(index: number) {
    console.log('Edit row', index);
  }

  deleteRow(index: number) {
    console.log('Delete row', index);
  }
}
