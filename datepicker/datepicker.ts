import { Component, computed, inject, input, model, output } from '@angular/core';
import { Field, FormField, ValidationError } from '@angular/forms/signals';
import { ValidationMessageService } from '@core/services/validation-message.service';
import { APP_VARIANT } from '@shared/ui/tokens/input-config';
import { FloatLabel } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [FloatLabel, DatePickerModule, FormField, FormsModule, TranslatePipe],
  selector: 'app-datepicker',
  templateUrl: './datepicker.html',
})
export class Datepicker {
  /** Optional Signal Forms Field. If provided, form validation and state are automatically bound. */
  readonly field = input<Field<any> | undefined>(undefined);

  /** Two-way model binding when not using Signal Forms. */
  readonly ngModel = model<any>();

  /** Event emitted on value change. */
  readonly onChange = output<any>();

  /** Translation key for the floating label. */
  readonly label = input<string>('');
  readonly styleClass = input<string>('');
  readonly placeholder = input<string>('');
  readonly showIcon = input(true);
  readonly appendTo = input<'body' | 'self'>('body');
  readonly display = input<'comma' | 'chip'>('chip');
  readonly variant = computed(() => APP_VARIANT());

  // ── Injections ──
  private readonly validationService = inject(ValidationMessageService);

  private readonly generatedId = `multiselect_${Math.random().toString(36).substring(2, 9)}`;

  readonly fieldState = computed(() => {
    const f = this.field();
    return f ? f() : null;
  });

  /** Unique ID for this input instance, used for label association and aria attributes. */
  readonly inputId = computed(() => {
    const state = this.fieldState();
    return state ? `multiselect_${state.name()}` : this.generatedId;
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
