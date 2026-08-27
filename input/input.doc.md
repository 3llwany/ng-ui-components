# InputComponent

## Description

A multi-purpose input component that handles text, number, and password types with built-in validation messages. It integrates with Angular Reactive Forms and supports floating labels.

## Usage

```html
<app-input label="username" [control]="form.controls.username" [submitted]="submitted"></app-input> <app-input label="password" type="password" [control]="form.controls.password"></app-input>
```

## Inputs

| Input         | Type          | Description                                                  |
| ------------- | ------------- | ------------------------------------------------------------ |
| `label`       | `string`      | Translation key for the floating label.                      |
| `control`     | `FormControl` | The FormControl instance.                                    |
| `type`        | `string`      | Type of input ('text', 'number', 'password', 'email', etc.). |
| `submitted`   | `boolean`     | Boolean to trigger validation message display.               |
| `disabled`    | `boolean`     | Boolean to toggle disabled state.                            |
| `placeholder` | `string`      | Helper text shown when empty.                                |
