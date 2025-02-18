import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  formData = {
    clientName: '',
    productName: '',
    barcode: '',
    price: 0
  };

  submitForm() {
    console.log('Product form submitted:', this.formData);
  }
}
