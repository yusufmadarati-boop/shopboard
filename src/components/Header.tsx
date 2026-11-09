// Header – site logo, search bar, and cart toggle button

import type { CartSummary } from "../types";

interface Props {
  cartSummary: CartSummary;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartOpen: () => void;
}

export function Header({ cartSummary, searchQuery, onSearchChange, onCartOpen }: Props) {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-mark">SB</span>
          <span className="header__logo-text">ShopBoard</span>
        </a>

        <div className="header__search">
          <label htmlFor="search-input" className="sr-only">
            Search products
          </label>
          <input
            id="search-input"
            type="search"
            className="header__search-input"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
          />
        </div>

        <button
          className="header__cart-btn"
          aria-label={`Open cart, ${String(cartSummary.itemCount)} items`}
          onClick={onCartOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"
            />
          </svg>
          {cartSummary.itemCount > 0 && (
            <span className="header__cart-badge" aria-hidden="true">
              {cartSummary.itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
