# Antigravity Rules - Monorepo Project

This file defines the coding standards and behavior for the Antigravity agent when working on the monorepo.

## Core Principles

- **Modern React**: Use React 18+ with functional components and hooks.
- **TypeScript First**: No `any`. Use strict typing and type imports (`import type`).
- **Monorepo Stack**:
  - **State Management**: Zustand
  - **Data Fetching**: TanStack Query (React Query)
  - **Validation**: Zod
  - **Styling**: Tailwind CSS (shared config)
  - **UI Components**: shadcn/ui
- **FSD-Lite Structure**:
  - `src/app**: Pages, routing, global styles.
  - `src/shared**: Reusable components, hooks, api, types, store, utils.

## Naming Conventions

- **Components**: PascalCase (folder and file).
- **Functions/Variables**: camelCase.
- **Constants**: UPPER_SNAKE_CASE.
- **Types/Interfaces**: PascalCase.
- **Files**: PascalCase for components, camelCase for others.

## Component Pattern

```tsx
import type { Props } from './types';

export function ComponentName({ prop }: Props) {
  // 1. Hooks
  // 2. Logic (handlers)
  // 3. Render
  return <div className="...">{prop}</div>;
}
```

## API Pattern

- Use Axios instance from `src/shared/api/client.ts`.
- Define endpoint functions with explicit types.

## Path Aliases

- Always use `@/` for internal imports.
