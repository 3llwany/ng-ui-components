import { Directive, input } from '@angular/core';

/**
 * Graceful image fallback directive.
 * Automatically catches (error) events on HTML <img> tags and switches to a fallback image.
 * Prevents broken image icons without reaching directly into the DOM from services.
 *
 * Usage:
 * ```html
 * <img [src]="user.avatarUrl" appImgFallback="assets/images/default-avatar.svg" alt="User avatar" />
 * ```
 */
@Directive({
  selector: 'img[appImgFallback]',
  host: {
    '(error)': 'onError($event)',
  },
})
export class ImgFallbackDirective {
  /** The fallback image URL to use when the primary source fails to load. */
  readonly fallback = input<string>('assets/images/placeholder.svg', {
    alias: 'appImgFallback',
  });

  private hasFailed = false;

  onError(event: Event): void {
    if (this.hasFailed) return; // Prevent infinite fallback loops
    this.hasFailed = true;

    const img = event.target as HTMLImageElement | null;
    if (img && this.fallback()) {
      img.src = this.fallback();
    }
  }
}

