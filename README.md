# About

[![Build Status](https://travis-ci.org/42BV/react-error-store.svg?branch=master)](https://travis-ci.org/42BV/react-error-store)
[![Codecov](https://codecov.io/gh/42BV/react-error-store/branch/master/graph/badge.svg)](https://codecov.io/gh/42BV/react-error-store)

Storing errors and listening to their changes.

# Installation

`npm install @42.nl/react-error-store --save`

# Documentation

See the [documentation](https://42bv.github.io/react-error-store/).

# Developing

When developing a new feature, make sure you do not update the `package.json`'s
version this will happen whenever a release is made on `master` by
the releasers.

Create a PR to submit your changes to the master branch, the maintainers
will review your work and decide if the feature warrented or if the
bug is vaporized.

# Releasing

Drafting a new release is as simple as running `npm run release`. This command runs (https://github.com/sindresorhus/np)[np] under the hood, which will guide you through the process of drafting a release.

A checklist for after the release:

- [] Make sure a tag is created in GitHub
- [] Make sure the release is created in GitHub.
- [] Make sure the release is on NPM.