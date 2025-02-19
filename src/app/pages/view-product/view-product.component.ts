import { Component, OnInit, inject } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [ViewTableComponent],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  private productService = inject(ProductService);

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Barcode', field: 'barcode' },
    { header: 'Client ID', field: 'client_id' },
    { header: 'Client Name', field: 'clientName' },
    { header: 'Price', field: 'price' }
  ];

  data: Product[] = [];

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
}
