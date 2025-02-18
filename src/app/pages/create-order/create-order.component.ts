import { Component } from '@angular/core';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CreateFormComponent],
  template: `<app-create-form entity="Order"></app-create-form>`
})
export class CreateOrderComponent {}
