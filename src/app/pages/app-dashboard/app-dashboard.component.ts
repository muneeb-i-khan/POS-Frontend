import { Component } from '@angular/core';
import { ManagementCardComponent } from '../../components/management-card/management-card.component';

@Component({
  selector: 'app-app-dashboard',
  standalone: true,
  imports: [
    ManagementCardComponent
  ],
  templateUrl: './app-dashboard.component.html',
  styleUrl: './app-dashboard.component.scss'
})
export class AppDashboardComponent {

}
