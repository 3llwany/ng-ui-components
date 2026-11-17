import {
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
import { Checkbox, type CheckboxChangeEvent } from 'primeng/checkbox';
import { AppFieldError } from '../foundation/field-error';
import { createUniqueId } from '../foundation/utils';
import { ValidationMessageService } from '../foundation/validation-message.service';

/**
 * Reusable checkbox component supporting Angular 22 Signal Forms and ControlValueAccessor.
 *
 * Usage:
 * ```html
 * <app-checkbox [field]="myForm.acceptTerms" label="FORM.ACCEPT_TERMS" />
 * ```
 */
@Component({
  selector: 'app-checkbox',
  host: {
    class: 'block w-full',
  },
  templateUrl: './checkbox.html',
  imports: [TranslatePipe, Checkbox, FormField, FormsModule, AppFieldError],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCheckbox),
      multi: true,
    },
  ],
})
export class AppCheckbox<T = boolean> implements ControlValueAccessor {
  /** Optional Signal Forms field. */
  readonly field = input<Field<T | null | undefined> | undefined>(undefined);

  /** Two-way model binding when not using Signal Forms. */
  readonly ngModel = model<T | null | undefined>();

  /** Internal model value when using ControlValueAccessor. */
  readonly modelValue = signal<T | boolean | null | undefined>(false);

  readonly effectiveValue = computed(() => this.ngModel() ?? this.modelValue());

  /** Translation key for the label. */
  readonly label = input<string>('');

  /** Optional translation key for helper description under the label. */
  readonly description = input<string>('');

  /** Allows selecting a boolean value instead of an array of values. */
  readonly binary = input(true);

  /** Value associated with this checkbox when `binary` is false. */
  readonly value = input<T | undefined>(undefined);

  /** Indeterminate visual state. */
  readonly indeterminate = input(false);

  /** Whether the checkbox is disabled. */
  readonly disabled = input(false);

  /** Whether the checkbox is readonly. */
  readonly readonly = input(false);

  /** Custom CSS classes on the checkbox wrapper. */
  readonly styleClass = input<string>('');

  /** Emitted when the checked value changes. */
  readonly onChange = output<T>();

  // ── Injections ──
  private readonly validationService = inject(ValidationMessageService);
  private readonly uid = createUniqueId('checkbox');

  readonly fieldState = computed(() => {
    const f = this.field();
    return f ? f() : null;
  });

  readonly inputId = computed(() => {
    const state = this.fieldState();
    return state ? `checkbox_${state.name()}_${this.uid}` : this.uid;
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
  private onChangeCb: (val: T | boolean | null | undefined) => void = () => {};
  public onTouchedCb: () => void = () => {};
  public isDisabled = signal<boolean>(false);

  writeValue(val: T | boolean | null | undefined): void {
    this.modelValue.set(val ?? false);
  }

  registerOnChange(fn: (val: T | boolean | null | undefined) => void): void {
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

  onPrimeChange(event: CheckboxChangeEvent): void {
    this.onChange.emit(event.checked as T);
  }
}
