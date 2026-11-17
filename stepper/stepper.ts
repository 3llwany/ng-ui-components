import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonDirective } from 'primeng/button';
import { Step, StepList, Stepper } from 'primeng/stepper';

export interface StepperStep {
  /** Translation key for the step label. */
  label: string;
  /** Optional numeric step value (defaults to 1-based index). */
  value?: number;
  /** Disables direct selection of this step. */
  disabled?: boolean;
}

/**
 * Generic wizard stepper component wrapping PrimeNG Stepper.
 *
 * Usage:
 * ```html
 * <app-stepper [steps]="steps" [(activeStep)]="currentStep" (onFinish)="submit()">
 *   @switch (currentStep()) {
 *     @case (1) { <step-one /> }
 *     @case (2) { <step-two /> }
 *   }
 * </app-stepper>
 * ```
 */
@Component({
  selector: 'app-stepper',
  host: {
    class: 'block w-full',
  },
  imports: [Stepper, StepList, Step, ButtonDirective, PIcon, TranslatePipe],
  templateUrl: './stepper.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppStepper {
  /** Ordered list of steps to display. */
  readonly steps = input.required<StepperStep[]>();

  /** Two-way active step value (1-based by default). */
  readonly activeStep = model<number>(1);

  /** Prevents jumping ahead out of order when `true`. */
  readonly linear = input(false);

  /** Shows the built-in Back / Next / Finish footer bar. */
  readonly showFooter = input(true);

  /** Translation key for the Back button on the first step. */
  readonly backLabel = input('COMMON.BACK');

  /** Translation key for the Previous button on steps > 1. */
  readonly previousLabel = input('COMMON.PREVIOUS');

  /** Translation key for the Next button. */
  readonly nextLabel = input('COMMON.NEXT');

  /** Translation key for the Finish button on the last step. */
  readonly finishLabel = input('COMMON.FINISH');

  /** Disables the Next / Finish button (e.g. while current step form is invalid). */
  readonly nextDisabled = input(false);

  /** Shows loading state on the Next / Finish button. */
  readonly loading = input(false);

  /** Optional custom CSS classes on the outer container. */
  readonly styleClass = input('');

  /** Emitted when the user clicks Finish on the final step. */
  readonly onFinish = output<void>();

  /** Emitted when the user clicks Back on the first step. */
  readonly onBack = output<void>();

  /** Emitted whenever the active step changes. */
  readonly stepChange = output<number>();

  readonly normalizedSteps = computed(() =>
    this.steps().map((step, index) => ({
      ...step,
      value: step.value ?? index + 1,
    })),
  );

  readonly currentIndex = computed(() => {
    const steps = this.normalizedSteps();
    const active = this.activeStep();
    const idx = steps.findIndex((s) => s.value === active);
    return idx >= 0 ? idx : 0;
  });

  readonly isFirstStep = computed(() => this.currentIndex() === 0);

  readonly isLastStep = computed(() => {
    const count = this.normalizedSteps().length;
    return count === 0 || this.currentIndex() >= count - 1;
  });

  onStepperValueChange(value: number | undefined): void {
    if (value !== undefined && value !== this.activeStep()) {
      this.activeStep.set(value);
      this.stepChange.emit(value);
    }
  }

  previousStep(): void {
    const steps = this.normalizedSteps();
    const idx = this.currentIndex();
    if (idx > 0) {
      const target = steps[idx - 1]!.value;
      this.activeStep.set(target);
      this.stepChange.emit(target);
    } else {
      this.onBack.emit();
    }
  }

  nextStep(): void {
    const steps = this.normalizedSteps();
    const idx = this.currentIndex();
    if (idx < steps.length - 1) {
      const target = steps[idx + 1]!.value;
      this.activeStep.set(target);
      this.stepChange.emit(target);
    } else {
      this.onFinish.emit();
    }
  }
}
