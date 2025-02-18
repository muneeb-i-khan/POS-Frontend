import { Component } from '@angular/core';
import { ManagementActionsComponent } from '../../components/management-actions/management-actions.component';

@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [ManagementActionsComponent],
  template: `
    <app-management-actions entity="Client" createRoute="/app/clients/create" viewRoute="/app/clients/view"></app-management-actions>
  `
})
export class ClientManagementComponent {}
