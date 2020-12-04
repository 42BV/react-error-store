import {
  clearErrors,
  setErrors,
  clearErrorsForValidator
} from '../src/actions';

import { errorStoreService } from '../src/service';

describe('clearErrors', () => {
  test('that it calls the errorStoreService.clearErrors', () => {
    jest.spyOn(errorStoreService, 'clearErrors');

    clearErrors();

    expect(errorStoreService.clearErrors).toBeCalledTimes(1);
  });
});

describe('clearErrorsForValidator', () => {
  test('that it calls the errorStoreService.clearErrorsForValidator', () => {
    jest.spyOn(errorStoreService, 'clearErrorsForValidator');

    clearErrorsForValidator('User.name');

    expect(errorStoreService.clearErrorsForValidator).toBeCalledTimes(1);
    expect(errorStoreService.clearErrorsForValidator).toBeCalledWith(
      'User.name'
    );
  });
});

describe('setErrors', () => {
  test('that it calls the errorStoreService.setErrors', () => {
    jest.spyOn(errorStoreService, 'setErrors');

    const errors = {
      User: {
        name: ['to short']
      }
    };

    setErrors(errors);

    expect(errorStoreService.setErrors).toBeCalledTimes(1);
    expect(errorStoreService.setErrors).toBeCalledWith(errors);
  });
});
