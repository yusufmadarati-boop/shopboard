# ShopBoard

A React + TypeScript e-commerce UI that connects to the ShopBoard API. Browse products, filter by category, sort by price or name, search by keyword, and manage a persistent cart.

## Live Features

- 🛍️ Product grid from live API (`shopboard-api.vercel.app`)
- 🔍 Real-time search + category filter + sort
- 🛒 Cart with quantity controls – **survives page refresh** (localStorage)
- ⚡ Loading, error (with "Try again"), empty, and "no match" states
- 📱 Responsive design

## Stack

- **React 19** + **TypeScript 5** (strict mode)
- **Vite 6** – build tool
- **ESLint 9** + **Prettier 3** – code quality
- **Husky** + **lint-staged** – pre-commit hooks

## Scripts

| Command             | Description      |
| ------------------- | ---------------- |
| `npm run dev`       | Start dev server |
| `npm run build`     | Production build |
| `npm run typecheck` | Type-check only  |
| `npm run lint`      | ESLint           |
| `npm run format`    | Prettier         |

## Component Tree

```
App                         (owns: productsState, searchQuery, selectedCategory, sortBy, cart, isCartOpen)
├── Header                  (props: cartSummary, searchQuery, onSearchChange, onCartOpen)
├── main
│   ├── CategoryFilter      (props: categories, selected, onSelect)
│   ├── SortSelect          (props: value, onChange)
│   └── ProductList         (props: state, searchQuery, onAddToCart, onRetry)
│       └── ProductCard[]   (props: product, onAddToCart)
└── CartDrawer              (props: isOpen, cart, summary, onClose, onIncrease, onDecrease, onRemove, onClear)
    └── CartItemRow[]       (props: item, onIncrease, onDecrease, onRemove)
```

### State Ownership

| State              | Owner | Description                                             |
| ------------------ | ----- | ------------------------------------------------------- |
| `productsState`    | `App` | Async state: loading / error / success with data        |
| `searchQuery`      | `App` | Current search string                                   |
| `selectedCategory` | `App` | Currently selected category filter                      |
| `sortBy`           | `App` | Current sort option                                     |
| `cart`             | `App` | Map of productId → CartItem (persisted to localStorage) |
| `isCartOpen`       | `App` | Whether the cart drawer is visible                      |

## Folder Structure

```
src/
├── api/
│   ├── client.ts           # fetchJson helper + ApiError
│   └── products.api.ts     # getProducts()
├── components/
│   ├── CartDrawer.tsx      # Slide-in cart panel
│   ├── CartItemRow.tsx     # Single cart item with quantity controls
│   ├── CategoryFilter.tsx  # Filter pill buttons
│   ├── Header.tsx          # Logo, search, cart button
│   ├── ProductCard.tsx     # Product tile
│   ├── ProductList.tsx     # Grid + all async states
│   └── SortSelect.tsx      # Sort dropdown
├── logic/
│   ├── cart.logic.ts       # Pure cart operations (add, remove, totals)
│   └── products.logic.ts   # Filter, search, sort (pure functions)
├── state/
│   └── cart.state.ts       # localStorage read/write
├── App.tsx                 # Root component + all state
├── index.css               # Design tokens + global styles
├── main.tsx                # React entry point
└── types.ts                # Product, CartItem, Cart, SortOption…
```
