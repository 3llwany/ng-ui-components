import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseButton } from '@shared/ui/base/base-button';
import { ButtonDirective } from 'primeng/button';
import { PIcon } from '@primeicons/angular/p-icon';

@Component({
  imports: [ButtonDirective, TranslatePipe, NgClass, PIcon],
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
