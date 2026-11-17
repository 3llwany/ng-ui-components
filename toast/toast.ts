import { Component, input } from '@angular/core';
import { Toast } from 'primeng/toast';

/**
 * Reusable toast container component wrapping PrimeNG Toast.
 * Place once at the root application shell.
 */
@Component({
  selector: 'app-toast',
  imports: [Toast],
  templateUrl: './toast.html',
})
export class AppToast {
  /** Optional key identifier to pair with a specific ToastService key. */
  readonly key = input<string | undefined>(undefined);

  /** Placement position of the toast notifications on screen. */
  readonly position = input<
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
    | 'center'
  >('top-right');
}

export { AppToast as Toast };
export { ToastService, type ToastOptions, type ToastSeverity } from './toast.service';
