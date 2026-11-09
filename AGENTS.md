# AGENTS.md – ShopBoard React Project

This file is for AI agents (Antigravity, etc.) working on this codebase.

## What This Project Is

ShopBoard is a React + TypeScript product browsing and cart application.
It fetches products from `https://shopboard-api.vercel.app/api/products` and provides
search, filter, sort, and cart functionality with localStorage persistence.

## Stack

- React 19 / TypeScript 5 (strict) / Vite 6
- ESLint 9 (typescript-eslint strict) / Prettier 3
- Husky + lint-staged on pre-commit

## Where New Code Goes

| What                                | Where                             |
| ----------------------------------- | --------------------------------- |
| A new API endpoint                  | `src/api/`                        |
| A new UI piece                      | `src/components/NewComponent.tsx` |
| A pure function (filter, transform) | `src/logic/`                      |
| Reading or writing storage          | `src/state/`                      |
| A new type                          | `src/types.ts`                    |

## Absolute Rules

1. **No `any`, no `as`, no `!`** – ever. Zero exceptions.
2. **Never use array index as React `key`** – always use `item.id` or equivalent.
3. **Every input element must have a `<label>` or `aria-label`**.
4. **Derived values belong in render, not in `useState` + `useEffect`**.
5. **Event handlers that return void must use block body syntax** `() => { fn(); }`.
6. **All code, comments, and commit messages in English**.
7. Run `npm run typecheck` and `npm run lint` before every commit.

## Verification Checklist Before Committing

- [ ] `npm run typecheck` → 0 errors
- [ ] `npm run lint` → 0 errors, 0 warnings
- [ ] `npm run build` → exits 0
- [ ] No `console.log` left in production code
- [ ] No `.js` files in `src/` – everything is `.ts` or `.tsx`
