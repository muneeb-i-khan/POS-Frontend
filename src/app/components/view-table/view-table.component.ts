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
  @Output() delete = new EventEmitter<number>();  
  @Output() edit = new EventEmitter<number>();
  @Input() editableFields: string[] = [];
  
  editRow(index: number) {
    this.edit.emit(index);
  }

  deleteRow(id: number) {
    this.delete.emit(id); 
  }

  isEditableField(field: string): boolean {
    return this.editableFields.includes(field);
  }
}
