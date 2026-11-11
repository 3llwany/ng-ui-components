import { inject, Injectable, Injector, runInInjectionContext, Type } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  DialogService as PrimeDialogService,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';

export interface ModalDialogOptions<TData = unknown> {
  readonly header?: string;
  readonly width?: string;
  readonly height?: string;
  readonly data?: TData;
  readonly modal?: boolean;
  readonly closable?: boolean;
  readonly dismissableMask?: boolean;
  readonly styleClass?: string;
  readonly focusOnShow?: boolean;
}

/**
 * Programmatic dynamic dialog service wrapping PrimeNG DialogService.
 * Allows opening modal components dynamically from code without template boilerplate.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly primeDialog =
    inject(PrimeDialogService, { optional: true }) ??
    runInInjectionContext(inject(Injector), () => new PrimeDialogService());
  private readonly translate = inject(TranslateService, { optional: true });

  async open<TComponent, TData = unknown>(
    component: Type<TComponent>,
    options?: ModalDialogOptions<TData>,
  ): Promise<DynamicDialogRef | null> {
    const header = options?.header ? await this.translateText(options.header) : undefined;

    return this.primeDialog.open(component, {
      header,
      width: options?.width ?? '90vw',
      styleClass: options?.styleClass ?? 'max-w-2xl',
      modal: options?.modal ?? true,
      closable: options?.closable ?? true,
      dismissableMask: options?.dismissableMask ?? false,
      focusOnShow: options?.focusOnShow ?? false,
      data: options?.data,
    });
  }

  /**
   * Opens a dynamic dialog and returns a Promise that resolves when the dialog is closed.
   */
  async openAsync<TComponent, TData = unknown, TResult = unknown>(
    component: Type<TComponent>,
    options?: ModalDialogOptions<TData>,
  ): Promise<TResult | undefined> {
    const ref = await this.open(component, options);
    if (!ref) {
      return undefined;
    }
    return new Promise<TResult | undefined>((resolve) => {
      ref.onClose.subscribe((result: TResult | undefined) => {
        resolve(result);
      });
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
