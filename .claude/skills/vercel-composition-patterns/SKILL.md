---
name: vercel-composition-patterns
description: React composition patterns that scale (children over render props, clean context interfaces, zero forwardRef in React 19).
---

# Vercel Composition Patterns

## 1. Composition Over Prop Drilling

- Pass components as `children` or explicit JSX slots to avoid threading props deeply through intermediaries.

## 2. React 19 Ref Handling

- In React 19, `ref` is a standard prop. Do not use legacy `forwardRef`.

## 3. Dedicated Context Providers

- Separate State Context from Action Context if updates are high-frequency, or use memoized provider values.
- Provide consumer custom hooks (`useCart()`, `useToast()`) with strict runtime invariant checks throwing helpful errors outside providers.

## 4. Single Responsibility Presentational Components

- Keep components focused strictly on presentation.
- Delegate data transformation and math to pure logic files (`*.logic.ts`).
