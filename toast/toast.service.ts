import { inject, Service } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { translateText } from '../foundation/utils';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

export interface ToastOptions {
  readonly life?: number;
  readonly sticky?: boolean;
  readonly key?: string;
  readonly id?: string | number;
}

@Service()
export class ToastService {
  private readonly messageService = inject(MessageService);
  private readonly translate = inject(TranslateService, { optional: true });

  /** Default toast life duration in milliseconds (5000ms). */
  defaultLife = 5000;

  async show(
    severity: ToastSeverity,
    detail: string,
    summary?: string,
    options?: ToastOptions,
  ): Promise<void> {
    const s = summary ? await translateText(this.translate, summary) : undefined;
    const d = await translateText(this.translate, detail);

    this.messageService.add({
      severity,
      summary: s,
      detail: d,
      life: options?.sticky ? undefined : (options?.life ?? this.defaultLife),
      sticky: options?.sticky ?? false,
      key: options?.key,
      id: options?.id,
    });
  }

  async success(detail: string, message = 'common.toast.success', options?: ToastOptions): Promise<void> {
    await this.show('success', detail, message, options);
  }

  async error(detail: string, message = 'common.toast.error', options?: ToastOptions): Promise<void> {
    await this.show('error', detail, message, { sticky: true, ...options });
  }

  async info(detail: string, message = 'common.toast.info', options?: ToastOptions): Promise<void> {
    await this.show('info', detail, message, options);
  }

  async warn(detail: string, message = 'common.toast.warning', options?: ToastOptions): Promise<void> {
    await this.show('warn', detail, message, options);
  }

  clear(key?: string): void {
    this.messageService.clear(key);
  }
}
