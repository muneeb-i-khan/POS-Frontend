import { Component, Input } from '@angular/core';
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


  editRow(index: number) {
    this.data[index].isEditing = !this.data[index].isEditing;
  }

  deleteRow(index: number) {
    this.data.splice(index, 1);
  }
}
