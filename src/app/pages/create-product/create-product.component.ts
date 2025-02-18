import { Component } from '@angular/core';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CreateFormComponent],
  template: `<app-create-form entity="Product"></app-create-form>`
})
export class CreateProductComponent {}
