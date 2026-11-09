// Products API – fetches and returns product list from ShopBoard API

import type { ApiProduct, Product } from "../types";
import { fetchJson } from "./client";

interface ProductsResponse {
  items: ApiProduct[];
  total: number;
}

/** Normalize a raw API product into our internal Product shape */
function normalize(raw: ApiProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category_name,
    priceCents: raw.price_cents,
    inStock: raw.in_stock,
  };
}

/**
 * Fetch all products from the API.
 * Pass forceFail=true to hit the /fail/500 endpoint (debug only).
 */
export async function getProducts(forceFail = false): Promise<Product[]> {
  const path = forceFail ? "/fail/500/api/products" : "/api/products";

  const data = await fetchJson<ProductsResponse>(path);
  return data.items.map(normalize);
}
