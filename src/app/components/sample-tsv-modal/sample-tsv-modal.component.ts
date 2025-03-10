import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-tsv-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal fade show d-block" *ngIf="isOpen" style="z-index: 1050;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Sample TSV File</h5>
          </div>
          <div class="modal-body">
            <pre>{{ sampleContent }}</pre>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="copyToClipboard()">Copy to Clipboard</button>
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SampleTsvModalComponent {
  @Input() isOpen: boolean = false;
  @Input() sampleContent: string = '';
  @Output() modalClosed = new EventEmitter<void>();

  closeModal() {
    this.modalClosed.emit();
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.sampleContent).then(() => {
      alert('Sample TSV content copied to clipboard!');
    });
  }
}
