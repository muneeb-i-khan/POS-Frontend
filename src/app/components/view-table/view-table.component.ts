import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent {
  @Input() columns: { header: string, field: string }[] = [];
  @Input() data: any[] = [];
  @Input() entity: string = '';
  @Output() delete = new EventEmitter<number>();  
  @Output() edit = new EventEmitter<number>();
  @Output() create = new EventEmitter<void>(); 
  @Input() editableFields: string[] = [];

  @Input() totalItems: number = 0;
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChange = new EventEmitter<number>();

  searchQuery: string = '';
  searchField: string = '';
  sortField: string = '';
  errorMessage: string = '';
  showError: boolean = false;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  filteredData() {
    return this.data
      .filter(row => {
        if (!this.searchQuery) return true;

        if (this.searchField) {
          return row[this.searchField]?.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
        }
        return this.columns.some(col => row[col.field]?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()));
      })
      .sort((a, b) => this.sortField ? 
        (a[this.sortField] > b[this.sortField] ? 1 : -1) : 0
      );
  }

  setSort(field: string) {
    this.sortField = field;
  }

  editRow(index: number) {
    this.edit.emit(index);
  }

  deleteRow(id: number) {
    this.delete.emit(id); 
  }

  isEditableField(field: string): boolean {
    return this.editableFields.includes(field);
  }

  onSearchChange(event: { field: string, query: string }) {
    this.searchField = event.field;
    this.searchQuery = event.query;
  }

  onCreate() {
    const USER_ROLE = sessionStorage.getItem('role');
    console.log(USER_ROLE);
    
    if (USER_ROLE === 'SUPERVISOR') {
      this.showError = false;
      this.errorMessage = '';
      this.create.emit();
    } else {
      this.errorMessage = 'Access Denied: OPERATORs can view entities only';
      this.showError = true;
      
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
