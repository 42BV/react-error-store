import { makeErrorStoreService } from '../src/service';

describe('EnumsService', () => {
  test('setErrors: should set errors and inform subscribers', () => {
    const service = makeErrorStoreService();

    const emailSubscriber = { onChange: jest.fn(), validator: 'User.email' };
    const nameSubscriber = { onChange: jest.fn(), validator: 'User.name' };
    const anySubscriber = { onChange: jest.fn() };

    service.subscribe(emailSubscriber);
    service.subscribe(nameSubscriber);
    service.subscribe(anySubscriber);

    service.setErrors({
      User: {
        email: ['email is wrong'],
        name: ['name is wrong', 'name is to short']
      }
    });

    expect(emailSubscriber.onChange).toBeCalledTimes(2);
    expect(emailSubscriber.onChange).toBeCalledWith(['email is wrong']);

    expect(nameSubscriber.onChange).toBeCalledTimes(2);
    expect(nameSubscriber.onChange).toBeCalledWith([
      'name is wrong',
      'name is to short'
    ]);

    expect(anySubscriber.onChange).toBeCalledTimes(2);
    expect(anySubscriber.onChange).toBeCalledWith({
      User: {
        email: ['email is wrong'],
        name: ['name is wrong', 'name is to short']
      }
    });
  });

  test('clear: should clear all errors and inform subscribers', () => {
    const service = makeErrorStoreService();

    const emailSubscriber = { onChange: jest.fn(), validator: 'User.email' };
    const nameSubscriber = { onChange: jest.fn(), validator: 'User.name' };
    const anySubscriber = { onChange: jest.fn() };

    service.subscribe(emailSubscriber);
    service.subscribe(nameSubscriber);
    service.subscribe(anySubscriber);

    service.setErrors({
      User: {
        email: ['email is wrong'],
        name: ['name is wrong', 'name is to short']
      }
    });

    service.clearErrors();

    expect(emailSubscriber.onChange).toBeCalledTimes(3);
    expect(emailSubscriber.onChange).toHaveBeenLastCalledWith([]);

    expect(nameSubscriber.onChange).toBeCalledTimes(3);
    expect(nameSubscriber.onChange).toHaveBeenLastCalledWith([]);

    expect(anySubscriber.onChange).toBeCalledTimes(3);
    expect(anySubscriber.onChange).toHaveBeenLastCalledWith({});
  });

  test('clear: should clear all errors and inform subscribers', () => {
    const service = makeErrorStoreService();

    const emailSubscriber = { onChange: jest.fn(), validator: 'User.email' };
    const nameSubscriber = { onChange: jest.fn(), validator: 'User.name' };
    const anySubscriber = { onChange: jest.fn() };

    service.subscribe(emailSubscriber);
    service.subscribe(nameSubscriber);
    service.subscribe(anySubscriber);

    service.setErrors({
      User: {
        email: ['email is wrong'],
        name: ['name is wrong', 'name is to short']
      }
    });

    service.clearErrorsForValidator('User.email');

    expect(emailSubscriber.onChange).toBeCalledTimes(3);
    expect(emailSubscriber.onChange).toHaveBeenLastCalledWith([]);

    expect(nameSubscriber.onChange).toBeCalledTimes(3);
    expect(nameSubscriber.onChange).toHaveBeenLastCalledWith([
      'name is wrong',
      'name is to short'
    ]);

    expect(anySubscriber.onChange).toBeCalledTimes(3);
    expect(anySubscriber.onChange).toHaveBeenLastCalledWith({
      User: { email: [], name: ['name is wrong', 'name is to short'] }
    });
  });

  test('subscription lifecycle', () => {
    const service = makeErrorStoreService();

    // Subscribe a subscriber.
    const subscriber = { onChange: jest.fn(), validator: 'User.email' };
    service.subscribe(subscriber);

    // It should immediately receive the state after subscribing.
    expect(subscriber.onChange).toBeCalledTimes(1);
    service.clearErrors();

    expect(subscriber.onChange).toBeCalledTimes(2);
    // Unsubscribe the subscriber, and call logout.
    service.unsubscribe(subscriber);
    service.clearErrors();

    // It should not have been informed anymore.
    expect(subscriber.onChange).toBeCalledTimes(2);
  });
});
