import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ViewTableComponent } from '../../components/view-table/view-table.component';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [ViewTableComponent, CreateFormComponent],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit, AfterViewInit {
  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' }
  ];

  data: Client[] = [];
  entity: string = 'Client';

  @ViewChild('createClientModal', { static: false }) createClientModal!: ElementRef;

  // Pagination properties
  totalClients: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.loadClients();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.createClientModal) {
        console.error('createClientModal is undefined.');
      }
    });
  }

  loadClients(page: number = 0) {
    this.clientService.getClientsPaginated(page, this.pageSize).subscribe({
      next: (response) => {
        this.data = response.clients.map(client => ({
          ...client,
          isEditing: false
        }));
        this.totalClients = response.totalClients;
        this.currentPage = page;
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
          this.loadClients(this.currentPage); // Reload clients
        },
        error: (err) => {
          console.error('Failed to delete client:', err);
        }
      });
    }
  }

  editClient(index: number) {
    const client = this.data[index];
    if (client.isEditing) {
      this.clientService.updateClient(client.id, {
        name: client.name,
        description: client.description
      }).subscribe({
        next: () => {
          client.isEditing = false;
          this.loadClients(this.currentPage);
        }
      });
    } else {
      client.isEditing = true;
    }
  }

  openCreateModal() {
    if (this.createClientModal) {
      this.createClientModal.nativeElement.style.display = 'flex';
    } else {
      console.error('createClientModal is not initialized yet.');
    }
  }

  closeCreateModal() {
    if (this.createClientModal) {
      this.createClientModal.nativeElement.style.display = 'none';
    }
  }

  handleClientCreated() {
    this.closeCreateModal();
    this.loadClients(this.currentPage);
  }

  goToPage(page: number) {
    this.loadClients(page);
  }
}
