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
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { AppFieldError } from '../foundation/field-error';
import { APP_VARIANT } from '../foundation/input-config';
import { createUniqueId, getDirection } from '../foundation/utils';
import { ValidationMessageService } from '../foundation/validation-message.service';

/**
 * Reusable textarea component supporting Angular 22 Signal Forms and ControlValueAccessor.
 *
 * Usage:
 * ```html
 * <app-textarea [field]="myForm.bio" label="FORM.BIO" [rows]="4" />
 * ```
 */
@Component({
  selector: 'app-textarea',
  host: {
    class: 'block w-full',
  },
  templateUrl: './textarea.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, FormsModule, Textarea, FloatLabel, AppFieldError],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppTextarea),
      multi: true,
    },
  ],
})
export class AppTextarea implements ControlValueAccessor {
  /** Optional Signal Forms field. Accepts nullable string fields cleanly. */
  readonly field = input<
    Field<string> | undefined,
    Field<string> | Field<string | null | undefined> | undefined
  >(undefined, {
    transform: (v) => v as Field<string> | undefined,
  });

  /** Two-way model binding when not using Signal Forms. */
  readonly ngModel = model<string | null | undefined>();

  /** Internal model value when using ControlValueAccessor. */
  readonly modelValue = signal<string>('');

  readonly effectiveValue = computed(() => this.ngModel() ?? this.modelValue());

  /** Translation key for the floating label. */
  readonly label = input<string>('');

  /** Translation key for placeholder text. */
  readonly placeholder = input<string>('');

  /** Visible number of text lines. */
  readonly rows = input(4);

  /** Optional visible width in average character widths. */
  readonly cols = input<number | undefined>(undefined);

  /** Automatically grow textarea height while typing. */
  readonly autoResize = input(true);

  /** Whether the textarea is disabled (CVA mode). */
  readonly disabled = input(false);

  /** Whether the textarea is readonly. */
  readonly readonly = input(false);

  /** Custom CSS classes applied to the textarea element. */
  readonly styleClass = input<string>('');

  /** PrimeNG FloatLabel variant. */
  readonly variant = input(inject(APP_VARIANT));

  /** Emitted when the value changes (CVA / ngModel mode). */
  readonly onChange = output<string>();

  /** Emitted when the user presses Enter inside the textarea. */
  readonly keyEnter = output<void>();

  // ── Injections ──
  private readonly validationService = inject(ValidationMessageService);
  private readonly uid = createUniqueId('textarea');

  readonly fieldState = computed(() => {
    const f = this.field();
    return f ? f() : null;
  });

  readonly inputId = computed(() => {
    const state = this.fieldState();
    return state ? `textarea_${state.name()}_${this.uid}` : this.uid;
  });

  readonly errorId = computed(() => `${this.inputId()}_error`);

  readonly isReadonly = computed(() => {
    const state = this.fieldState();
    return this.readonly() || (state ? state.readonly() : false);
  });

  readonly hasValue = computed(() => {
    const state = this.fieldState();
    const val = state ? state.value() : this.effectiveValue();
    return val !== '' && val !== null && val !== undefined;
  });

  readonly dir = computed<'rtl' | 'ltr'>(() => {
    const state = this.fieldState();
    const val = state ? state.value() : this.effectiveValue();
    return getDirection(val);
  });

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
  private onChangeCb: (val: string) => void = () => {};
  public onTouchedCb: () => void = () => {};
  public isDisabled = signal<boolean>(false);

  writeValue(val: string | null | undefined): void {
    this.modelValue.set(val ?? '');
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onValueChange(val: string): void {
    this.modelValue.set(val);
    this.ngModel.set(val);
    this.onChangeCb(val);
    this.onChange.emit(val);
  }

  onKeyEnter(): void {
    this.keyEnter.emit();
  }
}
