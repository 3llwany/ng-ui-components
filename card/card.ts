import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from 'primeng/card';

/**
 * Generic reusable card container wrapping PrimeNG Card.
 *
 * Usage:
 * ```html
 * <app-card header="CARD.TITLE" subheader="CARD.SUBTITLE">
 *   <p>Card body content</p>
 *   <div cardFooter>Footer actions</div>
 * </app-card>
 * ```
 */
@Component({
  selector: 'app-card',
  host: {
    class: 'block w-full',
  },
  imports: [Card, TranslatePipe],
  templateUrl: './card.html',
})
export class AppCard {
  /** Translation key for the card header/title. */
  readonly header = input<string>('');

  /** Translation key for the card subheader/subtitle. */
  readonly subheader = input<string>('');

  /** Optional custom CSS classes on the card root. */
  readonly styleClass = input<string>('');
}

export { AppCard as Card };
