# Confirm Dialog Component & Service (`app-confirm-dialog`)

Generic reusable confirmation dialog component and service wrapping PrimeNG ConfirmDialog with a clean `Promise<boolean>` API.

## Usage

Place `<app-confirm-dialog />` once in your root shell template:

```html
<app-confirm-dialog />
```

Trigger confirmation from any component:

```typescript
import { inject } from '@angular/core';
import { ConfirmService } from '@shared/ui';

export class MyComponent {
  private readonly confirm = inject(ConfirmService);

  async onDelete(id: string) {
    const confirmed = await this.confirm.delete('Student');
    if (!confirmed) return;

    // Proceed with deletion...
  }
}
```

