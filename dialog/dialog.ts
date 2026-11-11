import { Component, input, model } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';

/**
 * Generic reusable modal dialog component wrapping PrimeNG Dialog.
 *
 * Usage:
 * ```html
 * <app-dialog [(visible)]="isOpen" header="DIALOG.TITLE">
 *   <p>Dialog body content</p>
 *   <div dialogFooter>Footer buttons</div>
 * </app-dialog>
 * ```
 */
@Component({
  selector: 'app-dialog',
  imports: [Dialog, TranslatePipe],
  templateUrl: './dialog.html',
})
export class AppDialog {
  /** Two-way bound visibility state of the dialog. */
  readonly visible = model<boolean>(false);

  /** Translation key for the dialog header title. */
  readonly header = input<string>('');

  /** Translation key for the close button aria-label. */
  readonly closeAriaLabel = input<string>('');

  /** Whether the background is blocked with a modal mask. */
  readonly modal = input<boolean>(true);

  /** Whether the close icon is shown in the header. */
  readonly closable = input<boolean>(true);

  /** Whether the dialog can be dragged by its header. */
  readonly draggable = input<boolean>(false);

  /** Whether the dialog can be resized. */
  readonly resizable = input<boolean>(false);

  /** Custom style class applied to the dialog panel. */
  readonly styleClass = input<string>('w-full max-w-lg');
}

export { AppDialog as Dialog };
export { DialogService, type ModalDialogOptions } from './dialog.service';
