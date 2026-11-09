// CartItemRow – a single row in the cart drawer with quantity controls

import type { CartItem } from "../types";

/** Format price in cents as a dollar amount */
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

interface Props {
  item: CartItem;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { product, quantity } = item;
  const lineCents = product.priceCents * quantity;

  return (
    <li className="cart-item">
      <div className="cart-item__info">
        <p className="cart-item__title">{product.title}</p>
        <p className="cart-item__unit-price">{formatPrice(product.priceCents)} each</p>
      </div>

      <div className="cart-item__controls">
        <button
          className="cart-item__qty-btn"
          aria-label={`Decrease quantity of ${product.title}`}
          onClick={() => {
            onDecrease(product.id);
          }}
        >
          −
        </button>
        <span className="cart-item__qty" aria-label={`Quantity: ${String(quantity)}`}>
          {quantity}
        </span>
        <button
          className="cart-item__qty-btn"
          aria-label={`Increase quantity of ${product.title}`}
          onClick={() => {
            onIncrease(product.id);
          }}
        >
          +
        </button>
      </div>

      <div className="cart-item__right">
        <span className="cart-item__line-price">{formatPrice(lineCents)}</span>
        <button
          className="cart-item__remove"
          aria-label={`Remove ${product.title} from cart`}
          onClick={() => {
            onRemove(product.id);
          }}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
