# Card (`app-card`)

## Description

A generic container card component wrapping PrimeNG `p-card` with translated header/subheader and an optional `[cardFooter]` slot.

## Usage

```html
<app-card header="SECTION.TITLE" subheader="SECTION.SUBTITLE">
  <p>{{ 'SECTION.BODY' | translate }}</p>
  <div cardFooter class="flex justify-end gap-2">
    <app-button label="ACTIONS.SAVE" />
  </div>
</app-card>
```

## Inputs

| Input | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `header` | `string` | `''` | Translation key for the card title. |
| `subheader` | `string` | `''` | Translation key for the card subtitle. |
| `styleClass` | `string` | `''` | Additional CSS classes. |
