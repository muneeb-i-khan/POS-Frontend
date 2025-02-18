import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SaleItem {
  barcode: string;
  quantity: number;
  date: string;
}

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  saleItems: SaleItem[] = [{
    barcode: '',
    quantity: 0,
    date: new Date().toISOString().split('T')[0]
  }];

  addSaleItem() {
    this.saleItems.push({
      barcode: '',
      quantity: 0,
      date: new Date().toISOString().split('T')[0]
    });
  }

  submitForm() {
    console.log('Order form submitted:', this.saleItems);
  }
}
