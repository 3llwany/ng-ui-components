# InputComponent

## Description

A reusable input component built on **Angular 22 Signal Forms**. Supports text, email, password, and number input types with centralized validation error display, PrimeNG theming, and floating labels.

The component accepts a Signal Forms `Field` and automatically handles:
- Two-way value binding via `[formField]`
- Validation error display via `ValidationMessageService`
- Accessibility (aria-invalid, aria-describedby, label association)
- Required/disabled/readonly state from the Field

## Usage

```html
<!-- Basic text input -->
<app-input [field]="myForm.name" label="FORM.NAME" />

<!-- Email with prefix icon -->
<app-input [field]="myForm.email" label="FORM.EMAIL" type="email" [isPrefix]="true">
  <svg prefixIcon data-p-icon="Envelope"></svg>
</app-input>

<!-- Password -->
<app-input [field]="myForm.password" label="FORM.PASSWORD" type="password" />

<!-- Number with decimals -->
<app-input [field]="myForm.price" label="FORM.PRICE" type="number" [isDecimalNumber]="true" />
```

## Inputs

| Input           | Type                                       | Default  | Description                                   |
| --------------- | ------------------------------------------ | -------- | --------------------------------------------- |
| `field`         | `Field<string> \| Field<number>` (required) | —        | The Signal Forms field to bind.               |
| `label`         | `string`                                    | `''`     | Translation key for the floating label.       |
| `type`          | `'text' \| 'password' \| 'number' \| 'email'` | `'text'` | Input type.                                   |
| `placeholder`   | `string`                                    | —        | Placeholder text.                             |
| `isPrefix`      | `boolean`                                   | `false`  | Show prefix icon slot.                        |
| `isSuffix`      | `boolean`                                   | `false`  | Show suffix icon slot.                        |
| `autocomplete`  | `string`                                    | —        | HTML autocomplete attribute.                  |
| `step`          | `number`                                    | `1`      | Step value for number inputs.                 |
| `isDecimalNumber` | `boolean`                                 | `false`  | Allow decimal numbers.                        |
| `variant`       | `'on' \| 'in' \| 'over'`                   | `'on'`   | PrimeNG FloatLabel variant.                   |

## Outputs

| Output     | Type   | Description                     |
| ---------- | ------ | ------------------------------- |
| `keyEnter` | `void` | Emitted on Enter key press.     |

## Validation

Validation rules are defined in the **form**, not in the input:

```typescript
import { form, required, email, minLength } from '@angular/forms/signals';

loginForm = form(this.loginModel, (s) => {
  required(s.email);
  email(s.email);
  required(s.password);
  minLength(s.password, 8);
});
```

Error messages are centralized in `ValidationMessageService`. Adding a new error kind requires only adding an entry to the service — no form or input changes needed.
