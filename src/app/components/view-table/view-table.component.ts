import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-view-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, SearchBarComponent],
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent {
  @Input() columns: { header: string, field: string }[] = [];
  @Input() data: any[] = [];
  @Output() delete = new EventEmitter<number>();  
  @Output() edit = new EventEmitter<number>();
  @Input() editableFields: string[] = [];

  searchQuery: string = '';
  searchField: string = ''; 
  sortField: string = '';

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

  // Function to handle search changes
  onSearchChange(event: { field: string, query: string }) {
    this.searchField = event.field;
    this.searchQuery = event.query;
  }
}
