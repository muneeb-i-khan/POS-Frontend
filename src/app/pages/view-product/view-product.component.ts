import { Component, OnInit, inject } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [ViewTableComponent],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Barcode', field: 'barcode' },
    { header: 'Client Name', field: 'clientName' },
    { header: 'Price', field: 'price' }
  ];

  data: Product[] = [];
  entity: string = 'Product';

  constructor(private productService: ProductService, private router: Router) {} 
  ngOnInit() {
    this.loadProducts();
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
    console.log('Edit product called with index:', index);
    const product = this.data[index];
    console.log('Product to edit:', product);
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

  createProduct() {
    this.router.navigate(['/app/products/create']);
  }
}
