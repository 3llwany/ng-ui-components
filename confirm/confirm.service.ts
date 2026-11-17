import { inject, Service } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { translateText } from '../foundation/utils';

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

@Service()
export class ConfirmService {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly translate = inject(TranslateService, { optional: true });

  async confirm(options: ConfirmDialogOptions): Promise<boolean> {
    const header = options.header ? await translateText(this.translate, options.header) : undefined;
    const message = options.message
      ? await translateText(this.translate, options.message)
      : undefined;
    const defaultAccept = { label: 'common.actions.confirm' };
    const defaultReject = { label: 'common.actions.cancel' };
    const acceptLabel = options.acceptLabel
      ? await translateText(this.translate, options.acceptLabel)
      : await translateText(this.translate, defaultAccept.label);
    const rejectLabel = options.rejectLabel
      ? await translateText(this.translate, options.rejectLabel)
      : await translateText(this.translate, defaultReject.label);

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
}
