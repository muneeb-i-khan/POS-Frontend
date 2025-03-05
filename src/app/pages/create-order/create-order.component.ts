import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem, Customer } from '../../models/order.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  customer: Customer = { name: '', phone: '' }; 
  orderItems: OrderItem[] = [];
  newItem: OrderItem;
  errorMessage: string = '';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) {
    this.newItem = this.createEmptyOrderItem();
  }

  ngOnInit() {
  }

  private createEmptyOrderItem(): OrderItem {
    return { 
      barcode: '', 
      quantity: 0,
      sellingPrice: 0
    };
  }

  addOrderItem() {
    if (this.newItem.barcode && this.newItem.quantity > 0 && this.newItem.sellingPrice > 0) {
  
      this.orderItems.push({ ...this.newItem }); 
      this.newItem = this.createEmptyOrderItem(); 
    } else {
      console.error('Please fill in all fields correctly.');
    }
  }
  
  submitForm() {
    this.errorMessage = ''; 

    if (!this.customer.name || !this.customer.phone || this.orderItems.length === 0) {
      this.errorMessage = 'Please fill in customer details and add at least one item.';
      return;
    }

    const hasEmptyItems = this.orderItems.some(item => !item.barcode || item.quantity <= 0 || item.sellingPrice <= 0);
    if (hasEmptyItems) {
      this.errorMessage = 'Please ensure all items are filled out correctly.';
      return;
    }

    const order: Order = {
      customer: { name: this.customer.name, phone: this.customer.phone },
      orderItems: this.orderItems,
      orderDate: this.getTodayDate()
    };

    console.log('Order Payload:', order);

    this.orderService.postOrder(order).subscribe({
      next: () => this.router.navigate(['/app/orders/view']),
      error: (error) => {
        console.error('Error creating order:', error);
        this.errorMessage = error.error.error;
      }
    });
  } 

  removeOrderItem(index: number) {
    if (this.orderItems.length > 1) {
      this.orderItems.splice(index, 1);
    }
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  calculateTotalAmount(): number {
    return this.orderItems.reduce((total, item) => total + (item.quantity * item.sellingPrice), 0);
  }
}
