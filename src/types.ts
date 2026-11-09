// Core domain types for ShopBoard

/** Raw product shape returned by the API */
export interface ApiProduct {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
}

/** Normalized product used throughout the UI */
export interface Product {
  id: number;
  title: string;
  category: string;
  priceCents: number;
  inStock: boolean;
}

/** A single item in the shopping cart */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** The full cart – a map of product id → CartItem (undefined means not present) */
export type Cart = Record<number, CartItem | undefined>;

/** Pre-computed cart summary */
export interface CartSummary {
  itemCount: number;
  totalCents: number;
}

/** Category filter option – "All" means no filtering applied */
export type Category = string;

/** Sort options for the product list */
export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";
