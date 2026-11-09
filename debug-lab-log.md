# Debug Lab Log

Five bugs found and fixed from [shopboard-api.vercel.app/debug-lab](https://shopboard-api.vercel.app/debug-lab).

---

## Bug 1 – Products Showed Stale Data After Search Cleared

**What I saw:** After typing in the search box and then deleting the text, the product grid did not go back to showing all products — it stayed filtered.

**Component:** `App.tsx` → `ProductList`

**How I found it:** Opened the React DevTools Components tab and watched `searchQuery` state. The state was being updated correctly, but the filtered list wasn't being recomputed.

**Root cause:** `applyFilters` was being called outside the render function and cached incorrectly — it was not reactive to the `searchQuery` state change.

**Fix:** Moved the `applyFilters` call directly into the render body (as a derived value), so it runs on every re-render triggered by state change.

---

## Bug 2 – Cart Count Badge Showed NaN

**What I saw:** After adding items, the cart badge in the header showed "NaN" instead of the item count.

**Component:** `Header.tsx`

**How I found it:** Checked the `cartSummary` prop passed to `Header` and traced it to `getCartSummary`. Added a `console.log` and saw `itemCount` was `NaN`.

**Root cause:** `getCartSummary` was calling `.reduce()` on the cart values without an initial value. When the cart had one item, `reduce` received `undefined` as the accumulator.

**Fix:** Added `0` as the initial accumulator value in both `.reduce()` calls in `cart.logic.ts`.

---

## Bug 3 – Out-of-Stock Items Could Still Be Added

**What I saw:** Clicking "Add to Cart" on an out-of-stock product added it to the cart anyway.

**Component:** `ProductCard.tsx`

**How I found it:** Filtered products to only show out-of-stock items and clicked the button. The cart updated.

**Root cause:** The `disabled` attribute was set, but there was a separate click handler that wasn't gated. On some browsers, `disabled` doesn't prevent synthetic React click events.

**Fix:** Added an early return in `handleAddToCart` and also set `disabled={!product.inStock}` on the button, so both the UI and the handler are guarded.

---

## Bug 4 – Cart Was Lost on Page Refresh

**What I saw:** Adding items to the cart then refreshing the page resulted in an empty cart.

**Component:** `App.tsx` / `cart.state.ts`

**How I found it:** Added items, refreshed, opened cart — empty. Checked `localStorage` in DevTools Application tab and saw the key was missing.

**Root cause:** `saveCart` was being called in a `useEffect` that had `[]` as the dependency array — it only ran once on mount, never when the cart changed.

**Fix:** Changed the dependency array to `[cart]` so `saveCart(cart)` is called every time the cart state updates.

---

## Bug 5 – "Try Again" Button Did Not Re-Fetch

**What I saw:** When the API returned an error, clicking "Try again" in the error state had no effect — the error message stayed on screen.

**Component:** `ProductList.tsx` → `App.tsx`

**How I found it:** Used the `/fail/500/api/products` endpoint to trigger the error state. Clicked "Try again" — nothing happened, no network request in DevTools Network tab.

**Root cause:** `onRetry` was passed as a prop but the button's `onClick` was set to `undefined` because the prop was not wired through correctly in `App`.

**Fix:** Passed `fetchProducts` as `onRetry` to `ProductList` and confirmed the button calls it. The loading → error → retry cycle now works correctly.
