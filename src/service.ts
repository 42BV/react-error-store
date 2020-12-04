import set from 'lodash.set';
import get from 'lodash.get';

export type EntityError = {
  [field: string]: string[];
};

export type Errors = {
  [entity: string]: EntityError;
};

export type SubscriberCallback = (errors: string[]) => void;
export type SubscriberAllCallback = (errors: Errors) => void;

export type SubscriberSpecific = {
  /**
   * The callback to execute when ever the store changes.
   */
  onChange: SubscriberCallback;

  /**
   * The validator to listen to for example: 'User.email'.
   */
  validator: string;
};

export type SubscriberAll = {
  /**
   * The callback to execute when ever the store changes.
   */
  onChange: SubscriberAllCallback;

  validator?: never;
};

export type Subscriber = SubscriberSpecific | SubscriberAll;

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
export type ErrorStoreService = {
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
};

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
    subscribers = subscribers.filter((s) => s !== subscriber);
  }

  function informSubscribers(): void {
    subscribers.forEach(informSubscriber);
  }

  function informSubscriber(subscriber: Subscriber): void {
    if (determineIfSubscriberIsSubscriberSpecific(subscriber)) {
      const errorsForValidator = get(errors, subscriber.validator, []);
      const errorsAsStringArray = errorsForValidator as string[];
      subscriber.onChange(errorsAsStringArray);
    } else {
      subscriber.onChange(errors);
    }
  }

  function determineIfSubscriberIsSubscriberSpecific(
    subscriber: Subscriber
  ): subscriber is SubscriberSpecific {
    return subscriber.validator !== undefined;
  }
}

export const errorStoreService = makeErrorStoreService();
