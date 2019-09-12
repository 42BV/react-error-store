import { useEffect, useState } from 'react';

import { errorStoreService } from './service';

/**
 * Given the validator returns the array of errors for that validator.
 *
 * @export
 * @example
 * ```js
 *   function FormError() {
 *      const errors = useErrorsForValidator('User.name');
 *   }
 * ```
 * @param {string} validator The errors to retrieve for the validator.
 * @returns {string[]} Array errors for that validator.
 */
export function useErrorsForValidator(validator: string): string[] {
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    const onChange = (errors: string[]): void => {
      setState(errors);
    };

    const subscriber = {
      onChange,
      validator
    };

    errorStoreService.subscribe(subscriber);

    return () => {
      errorStoreService.unsubscribe(subscriber);
    };
  }, [validator]);

  return state;
}

/**
 * Clears all errors from the entire store once when the component
 * is loaded. Useful for clearing errors when a form is displayed, so
 * old errors do not linger around.
 *
 * @example
 * ```js
 *   function UserForm() {
 *      useClearErrors();
 *   }
 * ```
 * @export
 */
export function useClearErrors(): void {
  useEffect(() => {
    errorStoreService.clearErrors();
  });
}
