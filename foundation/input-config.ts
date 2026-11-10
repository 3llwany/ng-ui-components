import { InjectionToken } from '@angular/core';
import { ButtonVariant } from 'primeng/button';
import { FloatLabelVariant } from 'primeng/types/floatlabel';

export type InputSize = 'large' | 'small' | 'normal';

/**
 * Configuration token for providing default Input component settings.
 *
 * Note: With Signal Forms, the `control`/`submitted` properties are replaced
 * by the `field` input which accepts a Signal Forms Field directly.
 */
export interface InputConfig {
  label?: string;
  inputSize: InputSize;
  variant?: ButtonVariant;
  type: string;
  placeholder: string;
  readonly?: boolean;
  styleClass?: string;
  id: string;
  step?: number;
  isDecimalNumber?: boolean;
  autocomplete?: string;
}

export const DEFAULT_INPUT_CONFIG: InputConfig = {
  label: '',
  inputSize: 'normal',
  variant: 'outlined',
  isDecimalNumber: false,
  readonly: false,
  type: 'text',
  placeholder: '',
  id: Math.random().toString(36).substring(2),
};

export const INPUT_DEFAULTS = new InjectionToken<InputConfig>('DEFAULT_INPUT_CONFIG');

export const APP_VARIANT = new InjectionToken<FloatLabelVariant>('APP_VARIANT', {
  providedIn: 'root',
  factory: () => 'on',
});


