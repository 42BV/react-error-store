import '@testing-library/jest-dom';
import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import { useClearErrors, useErrorsForValidator } from '../src/hooks';
import { Errors, errorStoreService } from '../src/service';

afterEach(cleanup);

describe('useErrorsForValidator', () => {
  function setup({
    component: Component,
    errors
  }: {
    component: React.ComponentType<unknown>;
    errors: Errors;
  }) {
    errorStoreService.setErrors(errors);

    return render(<Component />);
  }

  it('should fetch all errors belong to the validator', async () => {
    expect.assertions(1);

    const { getByTestId } = setup({
      component: function Component() {
        const errors = useErrorsForValidator('User.email');
        return <p data-testid="header">{errors.join(', ')}</p>;
      },
      errors: {
        User: {
          email: ['email invalid']
        }
      }
    });

    await waitFor(() => {
      expect(getByTestId('header')).toHaveTextContent('email invalid');
    });
  });
});

describe('useClearErrors', () => {
  function UserForm() {
    useClearErrors();

    return <h1>User form</h1>;
  }

  it('should fetch all errors belong to the validator', async () => {
    expect.assertions(1);

    vi.spyOn(errorStoreService, 'clearErrors');

    const { rerender } = render(<UserForm />);

    // These calls should not trigger the clearErrors
    rerender(<UserForm />);
    rerender(<UserForm />);
    rerender(<UserForm />);

    expect(errorStoreService.clearErrors).toBeCalledTimes(1);
  });
});
