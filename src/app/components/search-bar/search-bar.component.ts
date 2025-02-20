import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, NgFor],
  template: `
    <label class="fw-bold">🔍 Search by:</label>
    <div class="input-group">
      <select class="form-select" [(ngModel)]="searchField" (ngModelChange)="onSearchChange()">
        <option value="">All Fields</option>
        <option *ngFor="let col of columns" [value]="col.field">{{ col.header }}</option>
      </select>
      <input type="text" class="form-control" placeholder="Type to search..." [(ngModel)]="searchQuery" (input)="onSearchChange()">
    </div>
  `,
  styles: [`
    .input-group {
      max-width: 500px;
    }
  `]
})
export class SearchBarComponent {
  @Input() columns: { header: string, field: string }[] = [];
  @Output() searchChange = new EventEmitter<{ field: string, query: string }>();

  searchField: string = '';
  searchQuery: string = '';

  onSearchChange() {
    this.searchChange.emit({ field: this.searchField, query: this.searchQuery });
  }
}
