import { Component } from '@angular/core';
import { ManagementActionsComponent } from '../../components/management-actions/management-actions.component';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [ManagementActionsComponent],
  template: `
    <app-management-actions entity="Order" createRoute="/app/orders/create" viewRoute="/app/orders/view"></app-management-actions>
  `
})
export class OrderManagementComponent {}
