import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem } from '../../models/order.model';


@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  orderItems: OrderItem[] = [this.createEmptyOrderItem()];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  private createEmptyOrderItem(): OrderItem {
    return { 
      barcode: '', 
      quantity: 0
    };
  }

  addOrderItem() {
    this.orderItems.push(this.createEmptyOrderItem());
  }

  submitForm() {
    const order: Order = {
      items: this.orderItems,
      orderDate: this.getTodayDate()
    };
  
    this.orderService.postOrder(order).subscribe({
      next: () => this.router.navigate(['/app/orders/view'])
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
}
