import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Shared accessible validation error message block for form controls.
 */
@Component({
  selector: 'app-field-error',
  imports: [TranslatePipe],
  template: `
    @if (message(); as msg) {
      <div
        [id]="errorId()"
        role="alert"
        class="text-red-500 text-xs font-medium mt-1.5 ms-1 flex items-center gap-1"
      >
        <svg
          class="w-3.5 h-3.5 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ msg | translate }}</span>
      </div>
    }
  `,
})
export class AppFieldError {
  readonly errorId = input.required<string>();
  readonly message = input<string | null>(null);
}
