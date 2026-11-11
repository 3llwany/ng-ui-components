import { Component, inject, Injectable, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { firstValueFrom } from 'rxjs';

export interface ConfirmDialogOptions {
  readonly message?: string;
  readonly header?: string;
  readonly icon?: string;
  readonly acceptLabel?: string;
  readonly rejectLabel?: string;
  readonly acceptSeverity?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warn'
    | 'help'
    | 'danger'
    | 'contrast';
  readonly rejectSeverity?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warn'
    | 'help'
    | 'danger'
    | 'contrast';
  readonly key?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly translate = inject(TranslateService, { optional: true });

  async confirm(options: ConfirmDialogOptions): Promise<boolean> {
    const header = options.header ? await this.translateText(options.header) : undefined;
    const message = options.message ? await this.translateText(options.message) : undefined;
    const defaultAccept = { label: 'common.actions.confirm' };
    const defaultReject = { label: 'common.actions.cancel' };
    const acceptLabel = options.acceptLabel
      ? await this.translateText(options.acceptLabel)
      : await this.translateText(defaultAccept.label);
    const rejectLabel = options.rejectLabel
      ? await this.translateText(options.rejectLabel)
      : await this.translateText(defaultReject.label);

    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm({
        key: options.key,
        message,
        header,
        icon: options.icon ?? 'pi pi-exclamation-triangle',
        acceptButtonProps: {
          label: acceptLabel,
          severity: options.acceptSeverity ?? 'primary',
        },
        rejectButtonProps: {
          label: rejectLabel,
          severity: options.rejectSeverity ?? 'secondary',
          outlined: true,
        },
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }

  delete(entityName?: string, options?: Partial<ConfirmDialogOptions>): Promise<boolean> {
    const deleteAction = { label: 'common.actions.delete' };
    const cancelAction = { label: 'common.actions.cancel' };
    const deleteMsg = entityName
      ? { message: 'common.confirm.delete_entity_msg' }
      : { message: 'common.confirm.delete_msg' };

    return this.confirm({
      header: 'common.confirm.delete_title',
      message: deleteMsg.message,
      icon: 'pi pi-trash',
      acceptLabel: deleteAction.label,
      rejectLabel: cancelAction.label,
      acceptSeverity: 'danger',
      ...options,
    });
  }

  private async translateText(keyOrText: string): Promise<string> {
    if (!this.translate) return keyOrText;
    try {
      const translated = await firstValueFrom(this.translate.get(keyOrText));
      return translated || keyOrText;
    } catch {
      return keyOrText;
    }
  }
}

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
