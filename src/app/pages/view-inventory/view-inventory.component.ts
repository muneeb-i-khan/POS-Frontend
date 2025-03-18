import { Component, OnInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../types/inventory.type';
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


  totalProducts: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private inventoryService: InventoryService, private router: Router) {} 

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory(page: number = 0) {
    this.inventoryService.getInventoriesPaginated(page, this.pageSize).subscribe({
      next: (response) => {
        this.data = response.inventories.map(inventory => ({
          ...inventory,
          isEditing: false
        }));
        this.totalProducts = response.totalInventories;
        this.currentPage = page;
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
    this.inventoryService.getInventoriesPaginated(0, this.pageSize).subscribe({
      next: (response) => {
        this.totalProducts = response.totalInventories;
        const lastPage = Math.max(0, Math.ceil(this.totalProducts / this.pageSize) - 1);
        this.loadInventory(lastPage);
      },
      error: (error) => {
        console.error('Error fetching updated inventory count:', error);
        this.loadInventory(this.currentPage);
      }
    });
  }

  handleTsvSubmitted() {
    console.log("TSV submitted event received");
    this.closeCreateModal();
    this.inventoryService.getInventoriesPaginated(0, this.pageSize).subscribe({
      next: (response) => {
        this.totalProducts = response.totalInventories;
        const lastPage = Math.max(0, Math.ceil(this.totalProducts / this.pageSize) - 1);
        this.loadInventory(lastPage);
      },
      error: (error) => {
        console.error('Error fetching updated inventory count:', error);
        this.loadInventory(this.currentPage);
      }
    });
  }

  goToPage(page: number) {
    this.loadInventory(page);
  }
  
}
