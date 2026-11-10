import { FormControl, FormGroup } from '@angular/forms';

/**
 * Interface representing the structure and behavior for form management and submission in a base component.
 */
export interface BaseAdd {
  /** The main form group for the component. */
  form: FormGroup;

  /** Indicates if the form has been submitted. */
  submitted: boolean;

  /** Optional flag to indicate if update functionality is available. */
  hasUpdate?: boolean;

  /** Optional map of form controls. */
  controls?: { [K in keyof any]: FormControl };

  /**
   * Handles form submission.
   */
  submit(): void;

  /**
   * Creates a new model instance.
   * @param model The data model to create.
   */
  create(model: any): void;

  /**
   * Optionally updates an existing model instance.
   * @param model The data model to update.
   */
  update?(model: any): void;
}

