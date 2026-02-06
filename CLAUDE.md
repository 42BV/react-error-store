# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@42.nl/react-error-store` is a small React library for storing validation errors and subscribing to changes. It uses a pub/sub pattern where consumers subscribe to error changes for specific entity fields (validators) using dot-notation paths like `User.email`.

## Commands

- **Full test suite** (lint + typecheck + coverage): `npm test`
- **Run tests in watch mode**: `npm start`
- **Run tests only (with coverage)**: `npm run test:coverage`
- **Type check**: `npm run test:ts`
- **Lint source**: `npm run lint:src`
- **Lint tests**: `npm run lint:test`
- **Build (compile TS to lib/)**: `npm run tsc`
- **Release**: `npm run release` (uses `np`)

## Architecture

The library has four source files under `src/`:

- **`service.ts`** — Core: `makeErrorStoreService()` creates a store instance with pub/sub. The singleton `errorStoreService` is the default instance. Errors are keyed by entity then field (e.g., `{ User: { email: ['...'] } }`). Subscribers can listen to a specific validator path (dot-notation) or to all errors. Uses lodash `get`/`set` for nested path access.
- **`actions.tsx`** — Thin wrappers (`setErrors`, `clearErrors`, `clearErrorsForValidator`) that delegate to the singleton `errorStoreService`.
- **`hooks.tsx`** — React hooks: `useErrorsForValidator(validator)` subscribes to errors for a validator path; `useClearErrors()` clears all errors on mount.
- **`index.ts`** — Barrel re-exports from actions, hooks, and service.

## Testing

- Tests live in `tests/` (not co-located with source).
- Jest with `ts-jest` preset and `jsdom` environment.
- **100% coverage threshold** on branches, functions, lines, and statements — any uncovered code will fail CI.
- `index.test.ts` uses a snapshot to verify barrel exports.
- `restoreMocks: true` is configured globally.

## Code Style

- Prettier with single quotes, no trailing commas. Enforced via lint-staged + husky on commit.
- ESLint: TypeScript + React + Prettier integration. Zero warnings allowed (`--max-warnings=0`).
- Async test functions require `expect.assertions` (jest/prefer-expect-assertions rule).
