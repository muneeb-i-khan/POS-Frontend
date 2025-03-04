import { Injectable } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: NgbToast[] = [];

  show(text: string, options: { classname?: string, delay?: number }) {
    this.toasts.push({ text, ...options });
  }

  remove(toast: NgbToast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}