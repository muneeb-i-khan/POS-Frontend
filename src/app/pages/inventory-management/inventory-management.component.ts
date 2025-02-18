import { Component } from '@angular/core';
import { ManagementActionsComponent } from '../../components/management-actions/management-actions.component';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [ManagementActionsComponent],
  template: `
    <app-management-actions entity="Inventory" createRoute="/app/inventory/create" viewRoute="/app/inventory/view"></app-management-actions>
  `
})
export class InventoryManagementComponent {}
