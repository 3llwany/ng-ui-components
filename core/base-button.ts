import { Component, input, output } from '@angular/core';
import { ButtonSeverity, ButtonVariant } from 'primeng/button';

@Component({
  template: ``,
})
export class BaseButton {
  // input
  label = input.required<string>();
  showLabel = input<boolean>(true);
  tooltip = input<string | null>(null);
  rounded = input<boolean>(false);
  icon = input<string | null>(null);
  disabled = input<boolean>(false);
  iconPos = input<'left' | 'right'>('right');
  styleClass = input<string | null>();
  severity = input<ButtonSeverity>('primary');
  loading = input<boolean>(false);
  outlined = input<boolean>(false);
  variant = input<ButtonVariant | undefined>();
  url = input<string | null>();
  queryParams = input<{} | any>();
  type = input<'button' | 'submit' | 'reset'>('button');

  // output
  onClick = output();

  Click() {
    this.onClick.emit();
  }
}

