import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order-details-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order-details-card.component.html',
  styleUrls: ['./order-details-card.component.scss']
})
export class OrderDetailsCardComponent {
  @Input() orderId!: number; 
  @Input() saleItems: any[] = []; 
}
