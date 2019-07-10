---
layout: default
title: Usage
description: 'Usage instructions for @42.nl/react-error-store.'
parent: Introduction
permalink: /usage
has_toc: true
nav_order: 4
---

# Usage

The idea behind this library is that you to have a way to set errors
for fields from places very distant from you component, which renders
the errors. This library will act as a middle man between the components
that render the errors, and the components that set the errors.

#### Setting errors

Here's how you can set errors:

```js
import React from 'react';
import { setErrors } from '@42.nl/react-error-store';

async function submitUser(user) {
  return fetch('api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => {
      if (error.response.status === 422) {
        error.response.json().then(errors => {
          // Set the global errors
          setErrors(errors);
        });
      }
    });
}
```

The `errors` are expected to look like this:

```json
{
  "User": {
    "email": ["invalid email"],
    "name": ["name is to short", "name not capitalized"]
  },
  "House": {
    "street": ["Not a valid street in the Netherlands"]
  }
}
```

The idea is that each entity has multiple fields where the values
are the actual errors.

#### Retrieving errors

This library provides access to the errors for a particular field
via `useErrorsForValidator`:

```js
import React from 'react';
import { useErrorsForValidator } from '@42.nl/react-error-store';

function FormError() {
  const errors = useErrorsForValidator('User.email'); // Get errors by validator

  return (
    <ul>
      {errors.map(error => <li key={error}>{error}</span>);}
    </ul>
  );
};
```

#### Clearing all errors

You can clear the entire store by calling `clearErrors`:

```js
import React, { useEffect } from 'react';
import { clearErrors } from '@42.nl/react-error-store';

function Form() {
  useEffect(() => {
    clearErrors();
  }, []);
}
```

#### Clearing specific errors for a field

You can reset an error by calling `clearErrorsForValidator`:

```js
import React, { useState } from 'react';
import { clearErrorsForValidator } from '@42.nl/react-error-store';

function UserForm() {
  const [username, setUsername] = useState('');

  function onUsernameChanged(event) {
    setUsername(event.target.value);

    // Clear errors whenever the value changes so errors do not stick around.
    clearErrorsForValidator('User.name');
  }

  return <input name="username" onChange={onUsernameChanged} />;
}
```