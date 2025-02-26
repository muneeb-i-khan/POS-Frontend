import { Component, OnInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory.model';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [ViewTableComponent, NgIf, CreateFormComponent],
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss']
})
export class ViewInventoryComponent implements OnInit {

  entity: string = 'Inventory';
  isModalOpen = false;

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Product Name', field: 'prodName' },
    { header: 'Barcode', field: 'barcode' },
    { header: 'Client Name', field: 'clientName' },
    { header: 'Quantity', field: 'quantity' }
  ];

  data: Inventory[] = [];

  constructor(private inventoryService: InventoryService, private router: Router) {} 

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

  editInventory(index: number) {
    const inventory = this.data[index];
    if (inventory.isEditing) {
      this.inventoryService.updateInventory(inventory.id, {
        barcode: inventory.barcode,
        quantity: inventory.quantity
      }).subscribe({
        next: () => {
          inventory.isEditing = false;
          this.loadInventory();
        }
      });
    } else {
      inventory.isEditing = true;
    }
  }

  openCreateModal() {
    this.isModalOpen = true;
  }

  closeCreateModal() {
    this.isModalOpen = false;
  }

  handleInventoryCreated() {
    this.closeCreateModal(); 
    this.loadInventory(); 
  }

  handleTsvSubmitted() {
    console.log("TSV submitted event received");
    this.closeCreateModal();
    this.loadInventory();
  }
  
}
