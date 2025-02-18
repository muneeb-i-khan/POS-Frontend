import { Component } from '@angular/core';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CreateFormComponent],
  template: `<app-create-form entity="Client"></app-create-form>`
})
export class CreateClientComponent {}
