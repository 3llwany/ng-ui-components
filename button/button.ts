import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { BaseButton } from '@shared/ui/base/base-button';
import { ButtonDirective } from 'primeng/button';

@Component({
  imports: [ButtonDirective, TranslatePipe,  PIcon],
  selector: 'app-button',
  templateUrl: './button.html',
  styles: [
    `
      .p-button:disabled {
        cursor: not-allowed;
      }
    `,
  ],
})
export class Button extends BaseButton {}
