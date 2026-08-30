import { Component, computed, inject, input, model, output } from '@angular/core';
import { Field, FormField, ValidationError } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';
import { ValidationMessageService } from '@core/services/validation-message.service';
import { APP_VARIANT } from '@shared/ui/tokens/input-config';

@Component({
  imports: [SelectModule, FloatLabel, TranslatePipe, FormField, FormsModule],
  selector: 'app-select',
  templateUrl: './select.html',
})
export class SelectApp<T> {
  /** Optional Signal Forms Field. If provided, form validation and state are automatically bound. */
  readonly field = input<Field<any> | undefined>(undefined);

  /** Two-way model binding when not using Signal Forms. */
  readonly ngModel = model<any>();

  /** Event emitted on value change. */
  readonly onChange = output<any>();

  /** Translation key for the floating label. */
  readonly label = input<string>('');
  readonly styleClass = input<string>('');
  readonly options = input.required<T[]>();
  readonly optionLabel = input.required<string>();
  readonly optionValue = input.required<string>();
  readonly placeholder = input<string>('');
  readonly loading = input(false);
  readonly multiple = input(false);
  readonly showClear = input(true);
  readonly appendTo = input<'body' | 'self'>('body');
  readonly variant = computed(() => APP_VARIANT());

  // ── Injections ──
  private readonly validationService = inject(ValidationMessageService);

  private readonly generatedId = `select_${Math.random().toString(36).substring(2, 9)}`;

  readonly fieldState = computed(() => {
    const f = this.field();
    return f ? f() : null;
  });

  /** Unique ID for this input instance, used for label association and aria attributes. */
  readonly inputId = computed(() => {
    const state = this.fieldState();
    return state ? `select_${state.name()}` : this.generatedId;
  });

  /** Error message ID for aria-describedby association. */
  readonly errorId = computed(() => `${this.inputId()}_error`);

  readonly showError = computed(() => {
    const state = this.fieldState();
    return state ? state.touched() && state.invalid() : false;
  });

  /** User-facing error message from the centralized validation service. */
  readonly errorMessage = computed<string | null>(() => {
    if (!this.showError()) return null;

    const state = this.fieldState();
    if (!state) return null;

    const errors: readonly ValidationError.WithOptionalFieldTree[] = state.errors();
    return this.validationService.getFirstMessage(errors);
  });
}
