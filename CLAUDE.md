# CLAUDE.md – ShopBoard React Project

## Stack

- **React 19** with hooks (no class components)
- **TypeScript 5** – strict mode, `noImplicitAny`, `noUnusedLocals`
- **Vite 6** – dev server and build
- **ESLint 9** + **typescript-eslint** – strict type-aware rules
- **Prettier 3** – formatting
- **Husky** + **lint-staged** – pre-commit enforcement

## Folder Structure

```
src/
├── api/          → HTTP calls to external services only
├── components/   → Reusable UI components (one per file)
├── logic/        → Pure functions – no React, no side effects
├── state/        → Side effects: localStorage, sessionStorage
├── App.tsx       → Root component and state owner
├── types.ts      → All shared TypeScript types
├── index.css     → Design tokens and global styles
└── main.tsx      → React entry point only
```

A new feature goes in a component file under `components/`. Business logic goes in `logic/`. If it touches storage, it goes in `state/`.

## Rules (learned from real mistakes)

### Rule 1 – Never use the array index as a React key

The AI tried to use the array index as the `key` prop in product lists. Index keys break React reconciliation when the list is filtered or sorted — React reuses the wrong DOM node.

**Always use a stable, unique id from the data:**

```tsx
// ❌ Wrong
{products.map((p, i) => <ProductCard key={i} ... />)}

// ✅ Correct
{products.map((p) => <ProductCard key={p.id} ... />)}
```

### Rule 2 – Never use `any`, `as`, or `!`

The AI generated `const data = response.json() as Product[]` to avoid dealing with the actual return type of `fetch`. This silences TypeScript but hides real bugs.

**Always use a typed generic or proper runtime check:**

```ts
// ❌ Wrong
const data = response.json() as Product[];

// ✅ Correct
return response.json() as Promise<ProductsResponse>; // typed at the boundary
```

### Rule 3 – Keep derived state out of useState

The AI wrapped `visibleProducts` in `useState` and tried to sync it with a `useEffect` watching `searchQuery`. This creates a one-render lag and stale data bugs.

**Derive values directly in the render function:**

```tsx
// ❌ Wrong
const [visible, setVisible] = useState(products);
useEffect(() => {
  setVisible(applyFilters(products, query, sort));
}, [products, query, sort]);

// ✅ Correct
const visible = applyFilters(products, selectedCategory, searchQuery, sortBy);
```

### Rule 4 – Every input must have a label

The AI generated `<input placeholder="Search..." />` without a `<label>` or `aria-label`. This breaks screen readers and fails WCAG.

**Use `htmlFor` + `id` or `aria-label` for every input:**

```tsx
<label htmlFor="search-input" className="sr-only">Search products</label>
<input id="search-input" ... />
```

### Rule 5 – void-returning callbacks must use block syntax in event handlers

The AI wrote `onClick={() => someVoidFn()}` and ESLint (no-confusing-void-expression) rejected it.

**Use block body for handlers that return void:**

```tsx
// ❌ Rejected by ESLint
onClick={() => onSelect(cat)}

// ✅ Correct
onClick={() => { onSelect(cat); }}
```
