import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-management-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './management-card.component.html',
  styleUrls: ['./management-card.component.scss']
})
export class ManagementCardComponent {
  @Input() title!: string;
  @Input() icon!: string;
  @Input() route!: string;
}
