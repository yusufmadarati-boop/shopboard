// CartDrawer – slide-in side panel showing cart contents and totals

import type { Cart, CartItem, CartSummary } from "../types";
import { CartItemRow } from "./CartItemRow";

/** Format price in cents as a dollar amount */
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

interface Props {
  isOpen: boolean;
  cart: Cart;
  summary: CartSummary;
  onClose: () => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

export function CartDrawer({
  isOpen,
  cart,
  summary,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: Props) {
  const items = Object.values(cart).filter(
    (item): item is CartItem => item !== undefined,
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart-overlay" aria-hidden="true" onClick={onClose} />}

      {/* Drawer */}
      <aside
        className={`cart-drawer${isOpen ? " cart-drawer--open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Cart</h2>
          <button
            className="cart-drawer__close"
            aria-label="Close cart"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p className="cart-drawer__empty-icon" aria-hidden="true">
              🛍️
            </p>
            <p className="cart-drawer__empty-text">Your cart is empty.</p>
            <p className="cart-drawer__empty-sub">Add a product to get started!</p>
          </div>
        ) : (
          <ul className="cart-drawer__list" aria-label="Cart items">
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </ul>
        )}

        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>Total</span>
            <span>{formatPrice(summary.totalCents)}</span>
          </div>

          <button
            className="btn btn--ghost"
            disabled={items.length === 0}
            onClick={onClear}
          >
            Clear cart
          </button>

          <button className="btn btn--accent" disabled={items.length === 0}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
