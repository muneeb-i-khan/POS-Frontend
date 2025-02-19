import { Component, OnInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [ViewTableComponent],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' }
  ];

  data: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.data = clients.map(client => ({
          ...client,
          isEditing: false
        }));
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }

  deleteClient(id: number) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.data = this.data.filter(client => client.id !== id); 
        },
        error: (err) => {
          console.error('Failed to delete client:', err);
        }
      });
    }
  }
}
