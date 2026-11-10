import { Service } from '@angular/core';
import { type ValidationError } from '@angular/forms/signals';

/**
 * Resolver function that converts a validation error into a user-facing message.
 */
type MessageResolver = (error: ValidationError) => string;

/**
 * Default validation error messages keyed by error `kind`.
 *
 * To add support for a new custom validator, add an entry here.
 * No other file needs to change.
 */
const DEFAULT_MESSAGES: Record<string, MessageResolver> = {
  required: () => 'VALIDATION.REQUIRED',

  email: () => 'VALIDATION.EMAIL',

  minLength: () => 'VALIDATION.MIN_LENGTH',

  maxLength: () => 'VALIDATION.MAX_LENGTH',

  min: () => 'VALIDATION.MIN',

  max: () => 'VALIDATION.MAX',

  pattern: () => 'VALIDATION.PATTERN',

  parse: () => 'VALIDATION.PATTERN',
};

/**
 * Centralized service for converting Signal Forms `ValidationError` objects
 * into user-facing messages.
 *
 * Architecture:
 *   Form Validators → Signal Forms Field → ValidationMessageService → Input Component → UI
 *
 * Adding a new error kind requires only adding an entry to `DEFAULT_MESSAGES`
 * or calling `registerMessage()` at bootstrap. No form or input changes needed.
 *
 * @publicApi
 */
@Service()
export class ValidationMessageService {
  private readonly resolvers = new Map<string, MessageResolver>(Object.entries(DEFAULT_MESSAGES));

  /**
   * Register (or override) a message resolver for a given error kind.
   * Useful for adding project-specific custom validators at app init.
   */
  registerMessage(kind: string, resolver: MessageResolver): void {
    this.resolvers.set(kind, resolver);
  }

  /**
   * Returns the first user-facing error message from the given error list,
   * or `null` if there are no errors.
   *
   * Priority:
   *   1. If the error already carries a `.message`, use it (allows form-level overrides).
   *   2. Look up a registered resolver by `error.kind`.
   *   3. Fall back to a generic default.
   */
  getFirstMessage(errors: readonly ValidationError.WithOptionalFieldTree[]): string | null {
    if (errors.length === 0) return null;

    const error = errors[0]!;

    // 1. Form-level custom message takes priority
    if (error.message) {
      return error.message;
    }

    // 2. Registered resolver
    const resolver = this.resolvers.get(error.kind);
    if (resolver) {
      return resolver(error);
    }

    // 3. Generic fallback
    return 'Invalid value';
  }
}

