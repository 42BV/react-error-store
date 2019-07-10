import { useEffect, useState } from 'react';

import { errorStoreService } from './service';

export function useErrorsForValidator(validator: string): string[] {
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    const onChange = (errors: string[]): void => {
      setState(errors);
    }

    const subscriber = {
      onChange,
      validator
    };

    errorStoreService.subscribe(subscriber);

    return () => {
      errorStoreService.unsubscribe(subscriber);
    }
  }, [validator]);

  return state;
}