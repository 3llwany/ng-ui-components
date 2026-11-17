import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { type Field, FormField, type ValidationError } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { RadioButton } from 'primeng/radiobutton';
import { AppFieldError } from '../foundation/field-error';
import { createUniqueId } from '../foundation/utils';
import { ValidationMessageService } from '../foundation/validation-message.service';

/**
 * Reusable radio button component supporting Angular 22 Signal Forms and ControlValueAccessor.
 *
 * Usage:
 * ```html
 * <app-radio-button [field]="myForm.plan" value="pro" label="PLANS.PRO" />
 * ```
 */
@Component({
  selector: 'app-radio-button',
  host: {
    class: 'block',
  },
  templateUrl: './radio-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RadioButton, FormField, FormsModule, PIcon, AppFieldError],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppRadioButton),
      multi: true,
    },
  ],
})
export class AppRadioButton<T = unknown> implements ControlValueAccessor {
  /** Optional Signal Forms field shared across the radio group. */
  readonly field = input<Field<T | null | undefined> | undefined>(undefined);

  /** Two-way model binding when not using Signal Forms. */
  readonly ngModel = model<T | null | undefined>();

  /** Internal model value when using ControlValueAccessor. */
  readonly modelValue = signal<T | null | undefined>(null);

  readonly effectiveValue = computed(() => this.ngModel() ?? this.modelValue());

  /** Value represented by this radio option. */
  readonly value = input.required<T>();

  /** Radio group name. Defaults to the bound field name when omitted. */
  readonly name = input<string>('');

  /** Translation key for the option label. */
  readonly label = input<string>('');

  /** Optional translation key for option description. */
  readonly description = input<string>('');

  /** Optional PrimeIcon name (e.g. 'credit-card'). */
  readonly icon = input<string | null>(null);

  /** Optional image URL displayed alongside the label. */
  readonly img = input<string | null>(null);

  /** Whether this radio option is disabled. */
  readonly disabled = input(false);

  /** Whether to render the validation error message below this option. */
  readonly showValidation = input(false);

  /** Custom CSS classes applied to the wrapper. */
  readonly styleClass = input<string>('');

  /** Emitted when this radio option is selected. */
  readonly onChange = output<T>();

  // ── Injections ──
  private readonly validationService = inject(ValidationMessageService);
  private readonly uid = createUniqueId('radio');

  readonly fieldState = computed(() => {
    const f = this.field();
    return f ? f() : null;
  });

  readonly effectiveName = computed(() => {
    const explicit = this.name();
    if (explicit) return explicit;
    const state = this.fieldState();
    return state ? state.name() : 'radio-group';
  });

  readonly inputId = computed(() => {
    const state = this.fieldState();
    return state ? `radio_${state.name()}_${this.uid}` : this.uid;
  });

  readonly errorId = computed(() => `${this.inputId()}_error`);

  readonly showError = computed(() => {
    const state = this.fieldState();
    return state ? state.touched() && state.invalid() : false;
  });

  readonly errorMessage = computed<string | null>(() => {
    if (!this.showError()) return null;
    const state = this.fieldState();
    if (!state) return null;

    const errors: readonly ValidationError.WithOptionalFieldTree[] = state.errors();
    return this.validationService.getFirstMessage(errors);
  });

  // ── ControlValueAccessor Implementation ──
  private onChangeCb: (val: T | null | undefined) => void = () => {};
  public onTouchedCb: () => void = () => {};
  public isDisabled = signal<boolean>(false);

  writeValue(val: T | null | undefined): void {
    this.modelValue.set(val);
  }

  registerOnChange(fn: (val: T | null | undefined) => void): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onValueChange(val: T): void {
    this.modelValue.set(val);
    this.ngModel.set(val);
    this.onChangeCb(val);
    this.onChange.emit(val);
  }

  onFieldSelect(): void {
    this.onChange.emit(this.value());
  }
}
