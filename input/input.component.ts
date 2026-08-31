import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { type Field, FormField, type ValidationError } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputText } from 'primeng/inputtext';
import { ValidationMessageService } from '@core/services/validation-message.service';
import { Eye } from '@primeicons/angular/eye';
import { EyeSlash } from '@primeicons/angular/eye-slash';
import { APP_VARIANT } from '@shared/ui/tokens/input-config';
import { getDirection } from '@shared/utlits';
/**
 * Reusable input component built on Angular 22 Signal Forms.
 *
 * Accepts a Signal Forms `Field` and handles:
 *  - Two-way value binding (via [formField])
 *  - Validation error display (via centralized ValidationMessageService)
 *  - Accessibility (aria-invalid, aria-describedby, label association)
 *  - Text, password, number, and email input types
 *  - PrimeNG theming (pInputText, pInputPassword, p-inputnumber)
 *  - Prefix/suffix icon slots via ng-content
 *
 * Usage:
 * ```html
 * <app-input [field]="myForm.name" label="FORM.NAME" />
 * ```
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    FormField,
    InputText,
    InputPasswordModule,
    InputNumberModule,
    FloatLabel,
    IconField,
    InputIcon,
    Eye,
    EyeSlash,
  ],
})
export class Input {
  mask: boolean = true;

  dir = computed(() => getDirection(this.fieldState().value()));

  // ── Injections ──
  private readonly validationService = inject(ValidationMessageService);

  // ── Required Inputs ──

  /**
   * The Signal Forms field to bind to this input.
   *
   * Typed as `Field<any>` because this is a multi-type wrapper component.
   * Type safety is enforced at the form definition level, not here.
   */
  readonly field = input.required<Field<any>>();

  // ── Optional Inputs ──

  /** Translation key for the floating label. */
  readonly label = input<string>('');

  /** Input type: text, password, number, email, or date. */
  readonly type = input<'text' | 'password' | 'number' | 'email' | 'date'>('text');

  /** Placeholder text. */
  readonly placeholder = input<string>();

  /** Whether to show a prefix icon slot. */
  readonly isPrefix = input(false);

  /** Whether to show a suffix icon slot. */
  readonly isSuffix = input(false);

  /** Autocomplete attribute value. */
  readonly autocomplete = input<string>();

  /** Step for number inputs. */
  readonly step = input(1);

  /** Whether number input accepts decimals. */
  readonly isDecimalNumber = input(false);

  /** PrimeNG FloatLabel variant. */
  readonly variant = computed(() => APP_VARIANT());

  // ── Outputs ──

  /** Emitted when the user presses Enter inside the input. */
  readonly keyEnter = output<void>();

  // ── Computed State (all derived from the field signal — no effects needed) ──

  /** Unique ID for this input instance, used for label association and aria attributes. */
  readonly inputId = computed(() => {
    const state = this.fieldState();
    return `input_${state.name()}`;
  });

  /** Error message ID for aria-describedby association. */
  readonly errorId = computed(() => `${this.inputId()}_error`);

  /** The FieldState of the bound field — central source of reactive state. */
  readonly fieldState = computed(() => this.field()());

  /** Whether the field is required (from Signal Forms metadata). */
  readonly isRequired = computed(() => this.fieldState().required());

  /** Whether the field is disabled. */
  readonly isDisabled = computed(() => this.fieldState().disabled());

  /** Whether the field is readonly. */
  readonly isReadonly = computed(() => this.fieldState().readonly());

  /** Whether validation errors should be shown (touched + invalid). */
  readonly showError = computed(() => {
    const state = this.fieldState();
    return state.touched() && state.invalid();
  });

  /** User-facing error message from the centralized validation service. */
  readonly errorMessage = computed<string | null>(() => {
    if (!this.showError()) return null;

    const errors: readonly ValidationError.WithOptionalFieldTree[] = this.fieldState().errors();
    return this.validationService.getFirstMessage(errors);
  });

  /** Whether the field has a value (for PrimeNG filled state). */
  readonly hasValue = computed(() => {
    const val = this.fieldState().value();
    return val !== '' && val !== null && val !== undefined;
  });

  // ── Event Handlers ──

  onKeyEnter(): void {
    this.keyEnter.emit();
  }
}
