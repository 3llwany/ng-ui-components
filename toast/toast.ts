import { Component, inject, Injectable, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

export interface ToastOptions {
  readonly life?: number;
  readonly sticky?: boolean;
  readonly key?: string;
  readonly id?: string | number;
}

@Injectable({
  providedIn: 'root',
})
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
    const s = summary ? await this.translateText(summary) : undefined;
    const d = await this.translateText(detail);

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
