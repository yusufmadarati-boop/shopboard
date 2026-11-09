// Pure product filtering, searching, and sorting logic

import type { Product, SortOption } from "../types";

/** Return every unique category present in the product list */
export function getCategories(products: Product[]): string[] {
  const seen = new Set<string>();
  for (const p of products) {
    seen.add(p.category);
  }
  return Array.from(seen).sort();
}

/** Filter products by category (pass "All" to skip filtering) */
export function filterByCategory(products: Product[], category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

/** Filter products by search query (case-insensitive title match) */
export function filterBySearch(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => p.title.toLowerCase().includes(q));
}

/** Sort products by the given option – returns a new array */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];

  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceCents - b.priceCents);
    case "price-desc":
      return copy.sort((a, b) => b.priceCents - a.priceCents);
    case "name-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      // "featured" – preserve original API order
      return copy;
  }
}

/** Apply category filter, search filter, and sort in one pass */
export function applyFilters(
  products: Product[],
  category: string,
  query: string,
  sort: SortOption,
): Product[] {
  return sortProducts(filterBySearch(filterByCategory(products, category), query), sort);
}
