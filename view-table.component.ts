import { ToastService } from 'path/to/toast.service';

@Component({
  // ...
})
export class ViewTableComponent {
  constructor(private toastService: ToastService) {}

  onCreate() {
    // Logic to add the entity
    const success = true; // Replace with actual success condition

    if (success) {
      this.toastService.show('Entity added successfully!', { classname: 'bg-success text-light', delay: 3000 });
    } else {
      this.toastService.show('Failed to add entity.', { classname: 'bg-danger text-light', delay: 3000 });
    }
  }
} 