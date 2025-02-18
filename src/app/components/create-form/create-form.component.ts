import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
  @Input() entity!: string;
  formData: any = {};  
  saleItems: any[] = [];

  addSaleItem() {
    this.saleItems.push({ barcode: '', quantity: '', date: '' });
  }

  submitForm() {
    console.log('Form Submitted:', this.entity, this.formData, this.saleItems);
  }
}
