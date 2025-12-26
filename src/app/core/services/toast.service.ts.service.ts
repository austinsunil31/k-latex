import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show(message: string, type: 'success' | 'error' = 'error') {
    const toastEl = document.getElementById('appToast');
    if (!toastEl) return;

    toastEl.classList.remove('text-bg-success', 'text-bg-danger');
    toastEl.classList.add(
      type === 'success' ? 'text-bg-success' : 'text-bg-danger'
    );

    toastEl.querySelector('.toast-body')!.textContent = message;

    const toast = new (window as any).bootstrap.Toast(toastEl, {
      delay: 3000
    });

    toast.show();
  }
}
