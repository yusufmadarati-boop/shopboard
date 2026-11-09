---
name: vercel-react-best-practices
description: Performance optimization and clean architectural guidelines for React 19 from Vercel Engineering.
---

# Vercel React Best Practices

## 1. Zero In-Place Mutations

- Never mutate state or props arrays/objects in place (`items.push()`, `items.sort()`, `item.qty++`).
- Always create immutable copies (`[...items].sort()`, `{ ...item, qty: item.qty + 1 }`).

## 2. Stable Keys

- Always use unique, stable entity IDs (`key={product.id}`).
- Never use array indices as keys when items can be sorted, filtered, or mutated.

## 3. Render Discipline

- Avoid unnecessary recalculations by deriving values during render or encapsulating pure business logic in domain files (`*.logic.ts`).
- Never perform side effects inside render functions or component bodies.

## 4. Conditional Rendering Guards

- Never write `{count && <Component />}` when `count` can be `0` (it will render `"0"` in React).
- Always use explicit boolean checks: `{count > 0 && <Component />}` or `{Boolean(count) && <Component />}`.
