import { Component } from '@angular/core';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-create-inventory',
  standalone: true,
  imports: [CreateFormComponent],
  template: `<app-create-form entity="Inventory"></app-create-form>`
})
export class CreateInventoryComponent {}
