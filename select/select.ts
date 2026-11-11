import {
  Component,
  computed,
  inject,
  input,
  output,
  forwardRef,
  signal,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Field, FormField, ValidationError } from '@angular/forms/signals';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';
import { ValidationMessageService } from '../foundation/validation-message.service';
import { APP_VARIANT } from '../foundation/input-config';
import { createUniqueId } from '../foundation/utils';

@Component({
  imports: [SelectModule, FloatLabel, TranslatePipe, FormField, FormsModule],
  selector: 'app-select',
  host: {
    class: 'block w-full',
  },
  templateUrl: './select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelect),
      multi: true,
    },
  ],
})
export class AppSelect<T> implements ControlValueAccessor {
  /** Optional Signal Forms Field. If provided, form validation and state are automatically bound. */
  readonly field = input<Field<T | null | undefined> | undefined>(undefined);

  /** Two-way model binding when not using Signal Forms. */
  readonly ngModel = model<T | null | undefined>();

  /** Internal model value when using ControlValueAccessor. */
  readonly modelValue = signal<T | null | undefined>(null);

  readonly effectiveValue = computed(() => this.ngModel() ?? this.modelValue());

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
  readonly filter = input(true);
  readonly showClear = input(true);
  readonly disabled = input(false);
  readonly appendTo = input<'body' | 'self'>('body');
  readonly variant = input(inject(APP_VARIANT));

  // ── Injections ──
  private readonly validationService = inject(ValidationMessageService);

  private readonly uid = createUniqueId('select');

  readonly fieldState = computed(() => {
    const f = this.field();
    return f ? f() : null;
  });

  /** Unique ID for this input instance, used for label association and aria attributes. */
  readonly inputId = computed(() => {
    const state = this.fieldState();
    return state ? `select_${state.name()}_${this.uid}` : this.uid;
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

  // ── ControlValueAccessor Implementation ──
  private onChangeCb: (val: any) => void = () => {};
  public onTouchedCb: () => void = () => {};
  public isDisabled = signal<boolean>(false);

  writeValue(val: any): void {
    this.modelValue.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onValueChange(val: any): void {
    this.modelValue.set(val);
    this.ngModel.set(val);
    this.onChangeCb(val);
    this.onChange.emit(val);
  }
}

export { AppSelect as Select };
