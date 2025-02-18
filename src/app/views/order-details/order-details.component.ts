import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  saleItems: any[] = []; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    this.saleItems = this.getSaleItemsForOrder(this.orderId);
  }

  getSaleItemsForOrder(orderId: number) {
    const saleItems = [
      { orderId: 1, barcode: '123456', price: 50, quantity: 2, date: '2025-02-18' },
      { orderId: 1, barcode: '1236', price: 5, quantity: 2, date: '2025-02-18' },
      { orderId: 2, barcode: '789012', price: 100, quantity: 2, date: '2025-02-19' }
    ];
    return saleItems.filter(item => item.orderId === orderId);
  }
}
