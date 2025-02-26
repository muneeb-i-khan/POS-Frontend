import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [ViewTableComponent, CreateFormComponent],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, AfterViewInit {
  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Barcode', field: 'barcode' },
    { header: 'Client Name', field: 'clientName' },
    { header: 'Price', field: 'price' }
  ];

  data: Product[] = [];
  entity: string = 'Product';

  @ViewChild('createProductModal', { static: false }) createProductModal!: ElementRef;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.createProductModal) {
        console.error('createProductModal is undefined.');
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.data = products.map(product => ({
          ...product,
          isEditing: false
        }));
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => {
          console.error('Failed to delete product:', err);
        }
      });
    }
  }

  editProduct(index: number) {
    const product = this.data[index];
    if (product.isEditing) {
      this.productService.updateProduct(product.id, {
        name: product.name,
        barcode: product.barcode,
        clientName: product.clientName,
        price: product.price
      }).subscribe({
        next: () => {
          product.isEditing = false;
          this.loadProducts();
        }
      });
    } else {
      product.isEditing = true;
    }
  }

  openCreateModal() {
    if (this.createProductModal) {
      const modal = this.createProductModal.nativeElement;
      modal.style.display = 'flex';
      modal.classList.add('show');
    } else {
      console.error('createProductModal is not initialized yet.');
    }
  }

  closeCreateModal() {
    if (this.createProductModal) {
      const modal = this.createProductModal.nativeElement;
      modal.style.display = 'none';
      modal.classList.remove('show');
    }
  }

  handleProductCreated() {
    this.closeCreateModal(); 
    this.loadProducts(); 
  }

  handleTsvSubmitted() {
    this.closeCreateModal();
    this.loadProducts();
  }
}
