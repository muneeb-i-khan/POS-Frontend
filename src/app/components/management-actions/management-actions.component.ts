import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-actions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './management-actions.component.html',
  styleUrl: './management-actions.component.scss'
})
export class ManagementActionsComponent {
  @Input() entity!: string;
  @Input() createRoute!: string;
  @Input() viewRoute!: string;

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
