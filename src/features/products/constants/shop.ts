export const SHOP_SORT_KEYS = [
  "featured",
  "price-low",
  "price-high",
  "rating",
  "discount",
] as const;

export type ShopSortKey = (typeof SHOP_SORT_KEYS)[number];

export const SHOP_SORT_LABELS: Record<ShopSortKey, string> = {
  featured: "Featured",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  rating: "Top Rated",
  discount: "Best Discount",
};
