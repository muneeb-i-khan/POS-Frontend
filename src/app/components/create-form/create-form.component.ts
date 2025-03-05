import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { InventoryService } from '../../services/inventory.service';
import { SampleTsvModalComponent } from '../sample-tsv-modal/sample-tsv-modal.component';
@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule, SampleTsvModalComponent],
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  @Input() entity!: string;
  @Output() clientCreated = new EventEmitter<void>(); 
  @Output() productCreated = new EventEmitter<void>();
  @Output() inventoryCreated = new EventEmitter<void>();
  @Output() tsvSubmitted = new EventEmitter<void>();
  formData: any = {};
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  isTsvModalOpen = false;
  sampleTsvContent = '';

  constructor(
    private router: Router,
    private clientService: ClientService,
    private productService: ProductService,
    private inventoryService: InventoryService
  ) {}
  
  submitForm() {
    this.errorMessage = null; 
  
    if (this.entity === 'Client') {
      this.clientService.postClient(this.formData).subscribe({
        next: () => {
          this.clientCreated.emit();
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            if (typeof err.error === 'object') {
              this.errorMessage = Object.values(err.error).join(' ');
            } else {
              this.errorMessage = err.error.error || "Failed to create client.";
            }
          } else {
            this.errorMessage = "Failed to create client: " + err.message;
          }
        }
      });
    } 

    else if (this.entity === 'Product') {
      this.productService.postProduct(this.formData).subscribe({
        next: () => {
          this.productCreated.emit();
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            if (typeof err.error === 'object') {
              this.errorMessage = Object.values(err.error).join(' ');
            } else {
              this.errorMessage = err.error.error || "Failed to create product.";
            }
          } else {
            this.errorMessage = "Failed to create product: " + err.message;
          }
        }
      });
    } 
    else if (this.entity === 'Inventory') {
      this.inventoryService.postInventory(this.formData).subscribe({
        next: () => {
          this.inventoryCreated.emit();
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            if (typeof err.error === 'object') {
              this.errorMessage = Object.values(err.error).join(' ');
            } else {
              this.errorMessage = err.error.error || "Failed to create inventory.";
            }
          } else {
            this.errorMessage = "Failed to create inventory: " + err.message;
          }
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
          console.log("TSV upload successful, emitting event");
          this.tsvSubmitted.emit();
          this.selectedFile = null;
        },
        error: (err) => {
          this.errorMessage = "Product upload failed: " + err.message;
          console.error("Product upload failed:", err);
        }
      });
    } 
  
    else if (this.entity === 'Inventory') {
      this.inventoryService.uploadInventoryTSV(this.selectedFile).subscribe({
        next: () => {
          console.log("TSV upload successful, emitting event");
          this.tsvSubmitted.emit();
          this.selectedFile = null;
        },
        error: (err) => {
          this.errorMessage = "Inventory upload failed: " + err.message;
          console.error("Inventory upload failed:", err);
        }
      });
    }
  }

  openTsvModal(entity: string) {
    this.isTsvModalOpen = true;
    this.sampleTsvContent = entity === 'Product' 
      ? `
      barcode\tname\tprice\tclient_name
      100\tProduct A\t10.00\tClient X
      101\tProduct B\t15.00\tClient Y
      102\tProduct C\t20.00\tClient Z
      ` 
      : `
      barcode\tquantity
      100\t10
      101\t20
      102\t30
      `;
  }

  closeTsvModal() {
    this.isTsvModalOpen = false;
  }
}
