import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { InventoryService } from '../../services/inventory.service';
import { SampleTsvModalComponent } from '../sample-tsv-modal/sample-tsv-modal.component';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule, SampleTsvModalComponent, NgIf],
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
        next: () => this.clientCreated.emit(),
        error: (err) => this.handleError(err, "Failed to create client")
      });
    } else if (this.entity === 'Product') {
      this.productService.postProduct(this.formData).subscribe({
        next: () => this.productCreated.emit(),
        error: (err) => this.handleError(err, "Failed to create product")
      });
    } else if (this.entity === 'Inventory') {
      this.inventoryService.postInventory(this.formData).subscribe({
        next: () => this.inventoryCreated.emit(),
        error: (err) => this.handleError(err, "Failed to create inventory")
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
        error: (err) => this.handleError(err, "Product upload failed")
      });
    } else if (this.entity === 'Inventory') {
      this.inventoryService.uploadInventoryTSV(this.selectedFile).subscribe({
        next: () => {
          console.log("TSV upload successful, emitting event");
          this.tsvSubmitted.emit();
          this.selectedFile = null;
        },
        error: (err) => this.handleError(err, "Inventory upload failed")
      });
    }
  }

  private async handleError(err: any, defaultMessage: string) {
    this.errorMessage = defaultMessage + ": ";

    if (err.status === 400 && err.error) {
      if (err.error instanceof Blob && err.error.type === 'application/json') {
        const errorText = await err.error.text();
        const errorJson = JSON.parse(errorText);
        this.errorMessage += errorJson.error || "Unknown error";
      } else if (typeof err.error === 'string') {
        this.errorMessage += err.error;
      } else if (typeof err.error === 'object') {
        this.errorMessage += Object.values(err.error).join(' ');
      }
    } else {
      this.errorMessage += err.message || "An unexpected error occurred";
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  openTsvModal(entity: string) {
    this.isTsvModalOpen = true;
    this.sampleTsvContent = entity === 'Product' 
      ? `
      barcode\tname\tprice\tclientName
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