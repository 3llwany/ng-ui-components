# Dialog (`app-dialog`)

## Description

A generic modal dialog component wrapping PrimeNG `p-dialog` with two-way `[(visible)]` model binding, translated header, and a `[dialogFooter]` projection slot.

## Usage

```html
<app-dialog [(visible)]="isDialogOpen" header="DIALOG.HEADER" closeAriaLabel="ACTIONS.CLOSE">
  <p>{{ 'DIALOG.MESSAGE' | translate }}</p>
  <div dialogFooter class="flex justify-end gap-2">
    <app-button label="ACTIONS.CONFIRM" (onClick)="isDialogOpen.set(false)" />
  </div>
</app-dialog>
```

## Inputs / Models

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `ModelSignal<boolean>` | `false` | Two-way visibility state (`[(visible)]`). |
| `header` | `string` | `''` | Translation key for the dialog title. |
| `closeAriaLabel` | `string` | `''` | Translation key for the close button accessible label. |
| `modal` | `boolean` | `true` | Enables modal backdrop. |
| `closable` | `boolean` | `true` | Shows header close button. |
| `styleClass` | `string` | `'w-full max-w-lg'` | Dialog container CSS classes. |
