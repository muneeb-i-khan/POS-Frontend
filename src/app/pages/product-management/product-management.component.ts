import { Component } from '@angular/core';
import { ManagementActionsComponent } from '../../components/management-actions/management-actions.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [ManagementActionsComponent],
  template: `
    <app-management-actions entity="Product" createRoute="/app/products/create" viewRoute="/app/products/view"></app-management-actions>
  `
})
export class ProductManagementComponent {}
