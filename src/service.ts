import set from 'lodash.set';
import get from 'lodash.get';

export interface EntityError {
  [field: string]: string[];
}

export interface Errors {
  [entity: string]: EntityError;
}

export type SubscriberCallback = (errors: string[]) => void;

export interface Subscriber {
  /**
   * The callback to execute when ever the store changes.
   */
  onChange: SubscriberCallback;

  /**
   * The validator to listen to for example: 'User.email'.
   */
  validator: string;
}

/**
 * Stores the Errors for an application based on entities and their
 * fields.
 * 
 * The `errors` is an object which looks like this:
 * 
 * ```js
 * {
 *   User: {
 *     name: ['Name to long', 'Name not unique']
 *   },
 *   Bank: {
 *     owner: ['No owner selected']
 *   }
 * } 
 * ```
 * 
 * The idea is that through a subscription it will be easy to subscribe
 * to the changes on each field.
 * 
 * To listen to a field you use a `validator` which is a path to an
 * entities field. For example `User.name` is a validator. 
 */
export interface ErrorStoreService {
  /**
   * In one go set all error for all entities and their field.
   * 
   * @param errors 
   */
  setErrors(errors: Errors): void;

  /**
   * Remove all errors for a specific field in an entity, through a validator.
   * 
   * @param validator 
   * @param error 
   */
  clearErrorsForValidator(validator: string): void;

  /**
   * Remove all errors from the store.
   */
  clearErrors(): void;

  /**
   * Subscribe to changes for a specific validator.
   * 
   * @param subscriber 
   */
  subscribe(subscriber: Subscriber): void;

  /**
   * Unsubscribe to changes.
   * 
   * @param subscriber 
   */
  unsubscribe(subscriber: Subscriber): void;
}

export function makeErrorStoreService(): ErrorStoreService {
  let errors: Errors = {};

  let subscribers: Subscriber[] = [];

  return {
    setErrors,
    clearErrorsForValidator,
    clearErrors,
    subscribe,
    unsubscribe
  };

  function setErrors(nextErrors: Errors): void {
    errors = nextErrors;
    
    informSubscribers();
  }

  function clearErrorsForValidator(validator: string): void {
    set(errors, validator, []);

    informSubscribers();
  }

  function clearErrors(): void {
    errors = {};
    
    informSubscribers();
  }

  function subscribe(subscriber: Subscriber): void {
    subscribers.push(subscriber);

    informSubscriber(subscriber);
  }

  function unsubscribe(subscriber: Subscriber): void {
    subscribers = subscribers.filter(s => s !== subscriber);
  }

  function informSubscribers(): void {
    subscribers.forEach(informSubscriber);
  }

  function informSubscriber(subscriber: Subscriber): void {
    const errosForValidator = get(errors, subscriber.validator, []);

    let errorsAsStringArray = errosForValidator as string[];

    subscriber.onChange(errorsAsStringArray);
  }
}

export const errorStoreService = makeErrorStoreService();