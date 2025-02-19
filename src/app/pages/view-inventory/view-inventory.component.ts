import { Component, OnInit, inject } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { InventoryService, Inventory } from '../../services/inventory.service';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [ViewTableComponent],
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss']
})
export class ViewInventoryComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Product ID', field: 'prodId' },
    { header: 'Product Name', field: 'prodName' },
    { header: 'Barcode', field: 'barcode' },
    { header: 'Client Name', field: 'clientName' },
    { header: 'Quantity', field: 'quantity' }
  ];

  data: Inventory[] = [];

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.inventoryService.getInventory().subscribe({
      next: (inventory) => {
        this.data = inventory.map(item => ({
          ...item,
          isEditing: false
        }));
      },
      error: (error) => {
        console.error('Error fetching inventory:', error);
      }
    });
  }

  deleteInventory(id: number) {
    if (confirm('Are you sure you want to delete this inventory?')) {
      this.inventoryService.deleteInventory(id).subscribe({
        next: () => this.loadInventory()
      });
    }
  }
}
