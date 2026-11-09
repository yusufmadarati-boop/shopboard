// Cart persistence layer – reads and writes the cart to localStorage

import type { Cart } from "../types";

const STORAGE_KEY = "shopboard_cart_v1";

/** Load the cart from localStorage. Returns an empty cart if nothing is saved. */
export function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as Cart;
  } catch {
    return {};
  }
}

/** Persist the current cart to localStorage */
export function saveCart(cart: Cart): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // localStorage may be unavailable in some environments; fail silently
  }
}
