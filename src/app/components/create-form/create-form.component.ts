import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
  @Input() entity!: string;
  @Output() clientCreated = new EventEmitter<void>(); 
  @Output() productCreated = new EventEmitter<void>();
  @Output() inventoryCreated = new EventEmitter<void>();
  formData: any = {};
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private productService: ProductService,
    private inventoryService: InventoryService
  ) {}

  submitForm() {
    if (this.entity === 'Client') {
      this.clientService.postClient(this.formData).subscribe({
        next: () => {
          this.clientCreated.emit(); 
        }
      });
    } 
    else if (this.entity === 'Product') {
      this.productService.postProduct(this.formData).subscribe({
        next: () => {
          this.productCreated.emit();
        }
      });
    } 
    else if (this.entity === 'Inventory') {
      this.inventoryService.postInventory(this.formData).subscribe({
        next: () => {
          this.inventoryCreated.emit();
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadTSV() {
    if (!this.selectedFile) {
      alert("Please select a TSV file to upload.");
      return;
    }
  
    if (this.entity === 'Product') {
      this.productService.uploadProductTSV(this.selectedFile).subscribe({
        next: () => {
          alert("Products uploaded successfully.");
          this.selectedFile = null;
        },
        error: (err) => {
          console.error("Product upload failed:", err);
          alert("Failed to upload products.");
        }
      });
    } 
    else if (this.entity === 'Inventory') {
      this.inventoryService.uploadInventoryTSV(this.selectedFile).subscribe({
        next: () => {
          alert("Inventory uploaded successfully.");
          this.selectedFile = null;
        },
        error: (err) => {
          console.error("Inventory upload failed:", err);
          alert("Failed to upload inventory.");
        }
      });
    }
  }  
}
