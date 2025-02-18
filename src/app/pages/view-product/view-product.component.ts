import { Component } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [ViewTableComponent],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {

  columns = [
    { header: 'Product ID', field: 'productId' },
    { header: 'Client ID', field: 'clientId' },
    { header: 'Client Name', field: 'clientName' },
    { header: 'Barcode', field: 'barcode' },
    { header: 'Product Name', field: 'productName' }
  ];

  data = [
    { productId: 1, clientId: 101, clientName: 'Muneeb', barcode: '123456', productName: 'Product A', isEditing: false },
    { productId: 2, clientId: 102, clientName: 'John', barcode: '789012', productName: 'Product B', isEditing: false }
  ];
}
