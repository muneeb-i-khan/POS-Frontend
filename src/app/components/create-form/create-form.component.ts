import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
  @Input() entity!: string;
  formData: any = {};  

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {}

  submitForm() {
    if (this.entity === 'Client') {
      this.clientService.postClient(this.formData).subscribe({
        next: () => {
          this.router.navigate(['/app/clients/view']);
        }
      });
    }
  }
}
