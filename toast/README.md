# Toast Component & Service (`app-toast`)

Generic reusable toast notification component and service wrapping PrimeNG Toast.

## Usage

Place `<app-toast />` once in your root shell template:

```html
<app-toast position="top-right" />
```

Trigger notifications from any service or component:

```typescript
import { inject } from '@angular/core';
import { ToastService } from '@shared/ui';

export class MyComponent {
  private readonly toast = inject(ToastService);

  onSave() {
    this.toast.success('Record saved successfully');
  }

  onError() {
    this.toast.error('An unexpected error occurred');
  }
}
```

