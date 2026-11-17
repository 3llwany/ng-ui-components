import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PIcon } from '@primeicons/angular/p-icon';

/**
 * Reusable empty state component for tables, lists, and dashboards.
 *
 * Usage:
 * ```html
 * <app-empty-data title="COMMON.NO_DATA" description="COMMON.TRY_ADDING" icon="inbox">
 *   <app-button label="ACTIONS.ADD" (onClick)="onAdd()" />
 * </app-empty-data>
 * ```
 */
@Component({
  selector: 'app-empty-data',
  host: {
    class: 'block w-full',
  },
  imports: [TranslatePipe, PIcon],
  templateUrl: './empty-data.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppEmptyData {
  /** Translation key for the main empty-state message. */
  readonly title = input<string>('COMMON.NO_DATA');

  /** Optional translation key for supporting description text. */
  readonly description = input<string>('');

  /** PrimeIcon name rendered above the title. */
  readonly icon = input<string>('inbox');

  /** Optional custom CSS classes for the container. */
  readonly styleClass = input<string>('');
}
