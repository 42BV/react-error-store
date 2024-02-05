import { Errors, errorStoreService } from './service';

/**
 * Remove all errors from the store.
 */
export function clearErrors(): void {
  errorStoreService.clearErrors();
}

/**
 * Remove all errors for a specific field in an entity, through a validator.
 */
export function clearErrorsForValidator(validator: string): void {
  errorStoreService.clearErrorsForValidator(validator);
}

/**
 * In one go set all error for all entities and their field.
 *
 * @param errors
 */
export function setErrors(errors: Errors): void {
  errorStoreService.setErrors(errors);
}
