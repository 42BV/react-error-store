import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import 'jest-dom/extend-expect';

import { useErrorsForValidator} from '../src/hooks';
import { errorStoreService, Errors } from '../src/service';

afterEach(cleanup);

describe('useErrorsForValidator', () => {
  function setup({
    component: Component,
    errors
  }: {
    component: React.ComponentType<any>;
    errors: Errors
  }) {
    errorStoreService.setErrors(errors);

    return render(
      <Component />
    );
  }

  it('should fetch all errors belong to the validator', async () => {
    const { getByTestId } = setup({
      component: () => {
        const errors = useErrorsForValidator('User.email');
        return <p data-testid="header">{errors.join(', ')}</p>;
      },
      errors: {
        User: {
          email: ['email invalid'] 
        }
      }
    });

    await wait(() => {
      expect(getByTestId('header')).toHaveTextContent('email invalid');
    });
  });
});