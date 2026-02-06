import {
  clearErrors,
  clearErrorsForValidator,
  setErrors
} from '../src/actions';

import { errorStoreService } from '../src/service';

describe('clearErrors', () => {
  test('that it calls the errorStoreService.clearErrors', () => {
    vi.spyOn(errorStoreService, 'clearErrors');

    clearErrors();

    expect(errorStoreService.clearErrors).toBeCalledTimes(1);
  });
});

describe('clearErrorsForValidator', () => {
  test('that it calls the errorStoreService.clearErrorsForValidator', () => {
    vi.spyOn(errorStoreService, 'clearErrorsForValidator');

    clearErrorsForValidator('User.name');

    expect(errorStoreService.clearErrorsForValidator).toBeCalledTimes(1);
    expect(errorStoreService.clearErrorsForValidator).toBeCalledWith(
      'User.name'
    );
  });
});

describe('setErrors', () => {
  test('that it calls the errorStoreService.setErrors', () => {
    vi.spyOn(errorStoreService, 'setErrors');

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
