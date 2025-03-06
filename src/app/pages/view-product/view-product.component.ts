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

   // Pagination properties
   totalProducts: number = 0;
   currentPage: number = 0;
   pageSize: number = 10;
 
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

  loadProducts(page: number = 0) {
    this.productService.getProductsPaginated(page, this.pageSize).subscribe({
      next: (response) => {
        this.data = response.products.map(product => ({
          ...product,
          isEditing: false
        }));
        this.totalProducts = response.totalProducts;
        this.currentPage = page;
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
    this.productService.getProductsPaginated(0, this.pageSize).subscribe({
      next: (response) => {
        this.totalProducts = response.totalProducts;
        const lastPage = Math.max(0, Math.ceil(this.totalProducts / this.pageSize) - 1);
        this.loadProducts(lastPage);
      },
      error: (error) => {
        console.error('Error fetching updated product count:', error);
        this.loadProducts(this.currentPage);
      }
    });
  }

  handleTsvSubmitted() {
    this.closeCreateModal();
    this.productService.getProductsPaginated(0, this.pageSize).subscribe({
      next: (response) => {
        this.totalProducts = response.totalProducts;
        const lastPage = Math.max(0, Math.ceil(this.totalProducts / this.pageSize) - 1);
        this.loadProducts(lastPage);
      },
      error: (error) => {
        console.error('Error fetching updated product count:', error);
        this.loadProducts(this.currentPage);
      }
    });
  }

  goToPage(page: number) {
    this.loadProducts(page);
  }
}
