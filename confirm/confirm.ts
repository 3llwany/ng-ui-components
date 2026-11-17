import { Component, input } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';

/**
 * Reusable confirm dialog host component wrapping PrimeNG ConfirmDialog.
 * Place once at the root application shell.
 */
@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialog],
  templateUrl: './confirm.html',
})
export class AppConfirmDialog {
  /** Optional key identifier to match a specific confirm target. */
  readonly key = input<string | undefined>(undefined);
}

export { AppConfirmDialog as ConfirmDialog };
export { ConfirmService, type ConfirmDialogOptions } from './confirm.service';
