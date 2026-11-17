import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChildren,
  Directive,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Paginator } from 'primeng/paginator';
import { Skeleton } from 'primeng/skeleton';
import { type Table, TableModule } from 'primeng/table';
import { type PaginatorState } from 'primeng/types/paginator';

export interface TableColumn {
  /** Translation key for the column header. */
  header: string;
  /** Property path (supports dot notation like `'user.name'`) or custom slot key. */
  prop: string;
  /** Whether the column is sortable (defaults to `true`). */
  sortable?: boolean;
  /** Marks this column as using a projected `<ng-template [appTableCol]="prop">`. */
  isDynamic?: boolean;
  /** Optional CSS classes for body cells in this column. */
  styleClass?: string;
  /** Optional CSS classes for the header cell. */
  headerStyleClass?: string;
}

export interface TablePageEvent {
  pageIndex: number;
  pageSize: number;
  first: number;
}

/**
 * Directive for projecting custom cell templates into `AppTable`.
 *
 * Usage:
 * ```html
 * <ng-template appTableCol="status" let-row>
 *   <span class="badge">{{ row.status }}</span>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[appTableCol]',
})
export class AppTableColDirective {
  readonly prop = input.required<string>({ alias: 'appTableCol' });
  readonly template = inject(TemplateRef<unknown>);
}

/**
 * Generic reusable data table component wrapping PrimeNG Table & Paginator.
 *
 * Supports skeleton loading, global search, sorting, column resize/reorder,
 * nested property resolution, custom dynamic cell templates (`[appTableCol]`),
 * and both local and server-side pagination.
 */
@Component({
  selector: 'app-table',
  host: {
    class: 'block w-full',
  },
  imports: [
    TableModule,
    Paginator,
    Skeleton,
    NgStyle,
    NgTemplateOutlet,
    TranslatePipe,
    IconField,
    InputIcon,
    InputText,
    PIcon,
  ],
  templateUrl: './table.html',
})
export class AppTable<T = Record<string, unknown>> {
  /** Table rows to display. */
  readonly list = input<T[]>([]);

  /** Column definitions. */
  readonly columns = input.required<TableColumn[]>();

  /** Shows skeleton loading rows when `true`. */
  readonly loading = input(false);

  /** Total records count for server-side pagination. Defaults to `list().length`. */
  readonly totalRecords = input<number | undefined>(undefined);

  /** Number of rows per page. */
  readonly pageSize = input(10);

  /** Zero-based current page index for server-side pagination. */
  readonly pageIndex = input(0);

  /** Available page size options in the paginator dropdown. */
  readonly rowsPerPageOptions = input<number[]>([5, 10, 20, 50]);

  /** Whether pagination is enabled. */
  readonly paginator = input(true);

  /** When `true`, PrimeNG handles pagination locally over `list()`. */
  readonly localPaginator = input(false);

  /** Shows gridlines around table cells. */
  readonly showGridlines = input(false);

  /** Allows column resizing. */
  readonly resizableColumns = input(true);

  /** Allows column reordering. */
  readonly reorderableColumns = input(true);

  /** Enables horizontal/vertical scrolling when needed. */
  readonly scrollable = input(true);

  /** Shows the global search input above the table. */
  readonly showSearchInput = input(true);

  /** Translation key for the search input placeholder. */
  readonly searchPlaceholder = input('COMMON.SEARCH');

  /** Translation key for the default empty-state title. */
  readonly emptyMessage = input('COMMON.NO_DATA');

  /** PrimeNG table density size. */
  readonly size = input<'small' | 'large' | undefined>('large');

  /** Number of skeleton placeholder rows while loading. */
  readonly skeletonRows = input(5);

  /** Minimum table width CSS value. */
  readonly minWidth = input('50rem');

  /** Custom CSS classes on the table wrapper. */
  readonly styleClass = input('');

  /** Emitted when server-side pagination changes. */
  readonly pageChange = output<TablePageEvent>();

  /** Emitted when a row is clicked. */
  readonly rowClick = output<T>();

  readonly columnTemplates = contentChildren(AppTableColDirective);

  readonly templateMap = computed(() => {
    const map = new Map<string, TemplateRef<unknown>>();
    for (const dir of this.columnTemplates()) {
      const key = dir.prop();
      if (key) {
        map.set(key, dir.template);
      }
    }
    return map;
  });

  readonly globalFilterFields = computed(() => this.columns().map((col) => col.prop));

  readonly effectiveTotalRecords = computed(() => this.totalRecords() ?? this.list().length);

  readonly skeletonRowIndexes = computed(() =>
    Array.from({ length: Math.max(1, this.skeletonRows()) }, (_, index) => index),
  );

  getDynamicTemplate(prop: string): TemplateRef<unknown> | undefined {
    return this.templateMap().get(prop);
  }

  getNestedProp(obj: T, path: string): unknown {
    return path.split('.').reduce<unknown>((acc, part) => {
      if (acc !== null && typeof acc === 'object' && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  }

  onSearch(event: Event, table: Table): void {
    const target = event.target as HTMLInputElement | null;
    table.filterGlobal(target?.value ?? '', 'contains');
  }

  handlePageChange(event: PaginatorState): void {
    this.pageChange.emit({
      pageIndex: event.page ?? 0,
      pageSize: event.rows ?? this.pageSize(),
      first: event.first ?? 0,
    });
  }
}
