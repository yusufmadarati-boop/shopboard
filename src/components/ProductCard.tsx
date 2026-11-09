// ProductCard – displays a single product with add-to-cart action

import type { Product } from "../types";

/** Format price in cents as a dollar amount */
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <div className="product-card__image-placeholder" aria-hidden="true">
          {product.category.charAt(0)}
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h2 className="product-card__title">{product.title}</h2>

        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.priceCents)}</span>

          {product.inStock ? (
            <span className="product-card__badge product-card__badge--in-stock">
              In Stock
            </span>
          ) : (
            <span className="product-card__badge product-card__badge--out-of-stock">
              Out of Stock
            </span>
          )}
        </div>

        <button
          className="product-card__btn"
          disabled={!product.inStock}
          onClick={() => {
            onAddToCart(product);
          }}
          aria-label={`Add ${product.title} to cart`}
        >
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}
