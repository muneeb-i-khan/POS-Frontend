import { Component } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [ViewTableComponent],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent {
  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },
    { header: 'Actions', field: 'actions' }
  ];

  data = [
    { id: 1, name: 'Muneeb', description: 'VIP Client', isEditing: false },
    { id: 2, name: 'John', description: 'Regular Client', isEditing: false }
  ];
}
