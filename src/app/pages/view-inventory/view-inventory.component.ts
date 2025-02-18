import { Component } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [ViewTableComponent],
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss']
})
export class ViewInventoryComponent {
  columns = [
    { header: 'Inventory ID', field: 'inventoryId' },
    { header: 'Barcode', field: 'barcode' },
    { header: 'Client Name', field: 'clientName' },
    { header: 'Product ID', field: 'productId' },
    { header: 'Product Name', field: 'productName' },
    { header: 'Quantity', field: 'quantity' },
    { header: 'Actions', field: 'actions' }
  ];

  data = [
    { inventoryId: 1, barcode: '123456', clientName: 'Muneeb', productId: 1, productName: 'Product A', quantity: 50, isEditing: false },
    { inventoryId: 2, barcode: '789012', clientName: 'John', productId: 2, productName: 'Product B', quantity: 100, isEditing: false }
  ];
}
