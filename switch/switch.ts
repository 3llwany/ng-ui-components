import {
  Component,
  computed,
  DOCUMENT,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field, FormField, ValidationError } from '@angular/forms/signals';
import { ValidationMessageService } from '../foundation/validation-message.service';
import { createUniqueId } from '../foundation/utils';
import { TranslatePipe } from '@ngx-translate/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-switch',
  imports: [ToggleSwitchModule, FormField, FormsModule, TranslatePipe],
  templateUrl: './switch.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSwitch),
      multi: true,
    },
  ],
})
export class AppSwitch implements ControlValueAccessor {
  /** Optional Signal Forms Field. If provided, form validation and state are automatically bound. */
  readonly field = input<Field<boolean | null | undefined> | undefined>(undefined);

  /** Two-way model binding when not using Signal Forms. */
  readonly ngModel = model<boolean | null | undefined>();

  /** Internal model value when using ControlValueAccessor. */
  readonly modelValue = signal<boolean>(false);

  readonly effectiveValue = computed(() => {
    const modelVal = this.ngModel();
    return modelVal !== undefined ? Boolean(modelVal) : this.modelValue();
  });

  /** Event emitted on value change. */
  readonly onChange = output<boolean>();

  /** Translation key for the label. */
  readonly label = input<string>('');

  /** Translation key for the subtitle/description under the label. */
  readonly description = input<string>('');

  readonly styleClass = input<string>('');
  readonly disabled = input<boolean>(false);

  bg = computed(() => {
    let bgClass;
    // if (this.effectiveValue() || this.fieldState()?.value()) {
    //   bgClass = ' bg-emerald-50 border-emerald-100 hover:bg-emerald-100/60 dark:hover:bg-emerald-800/80 text-emerald-900 dark:text-emerald-100';
    // } else {
    //   bgClass = ' bg-surface-50 border-surface-200 hover:bg-surface-100/60 dark:hover:bg-surface-800/80 text-surface-900 dark:text-surface-100';
    // }
    return bgClass;
  });

  // ── Injections ──
  private readonly document = inject(DOCUMENT);
  private readonly validationService = inject(ValidationMessageService);

  private readonly uid = createUniqueId('switch');

  readonly fieldState = computed(() => {
    const f = this.field();
    return f ? f() : null;
  });

  /** Unique ID for this input instance, used for label association and aria attributes. */
  readonly inputId = computed(() => {
    const state = this.fieldState();
    return state ? `switch_${state.name()}_${this.uid}` : this.uid;
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
    this.modelValue.set(Boolean(val));
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
    const boolVal = Boolean(val);
    this.modelValue.set(boolVal);
    this.ngModel.set(boolVal);
    this.onChangeCb(boolVal);
    this.onChange.emit(boolVal);
  }

  toggle(): void {
    if (this.disabled() || this.isDisabled()) return;

    const el = this.document.getElementById(this.inputId());
    if (el) {
      el.click();
    } else {
      const next = !this.effectiveValue();
      this.onValueChange(next);
    }
  }
}
