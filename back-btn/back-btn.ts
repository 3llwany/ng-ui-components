import { Component, inject, input, output } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Tooltip } from 'primeng/tooltip';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [TranslatePipe, Tooltip, PIcon, ButtonModule],
  selector: 'back-btn',
  templateUrl: './back-btn.html',
})
export class BackBtn {
  public readonly title = input<string>('COMMON.BACK');
  public readonly onClick = output<void>();
  public readonly langService = inject(TranslateService);
}
