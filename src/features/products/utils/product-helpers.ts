import { Product } from "@/features/products/services/productsApi";

export const DEFAULT_PRODUCT_IMAGE = "/images/default.png";
export const MAX_PRODUCT_QUANTITY = 10;

export function getProductImage(product: Partial<Product>) {
  const imageCandidates = [product?.images?.[0], product?.thumbnail].filter(
    (value) => typeof value === "string" && value.trim().length > 0
  );

  const firstImage = imageCandidates[0];

  if (!firstImage) {
    return DEFAULT_PRODUCT_IMAGE;
  }

  if (firstImage.startsWith("//")) {
    return `https:${firstImage}`;
  }

  return firstImage;
}

export function getProductGallery(product: Partial<Product>, limit?: number) {
  const normalizedImages = Array.isArray(product?.images)
    ? product.images.filter(
        (image) => typeof image === "string" && image.trim().length > 0
      )
    : [];

  const images = normalizedImages.length
    ? normalizedImages
    : [getProductImage(product)];

  return typeof limit === "number" ? images.slice(0, limit) : images;
}

export function getCategoryLabel(categorySlug = "") {
  return categorySlug.replace(/-/g, " ");
}

export function buildProductSearchText(product: Partial<Product>) {
  return [product?.title, product?.brand, product?.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export interface ProductFilters {
  searchTerm?: string;
  inStockOnly?: boolean;
  sortBy?: "featured" | "price-low" | "price-high" | "rating" | "discount";
}

export function filterAndSortProducts(products: Product[], filters: ProductFilters) {
  const { searchTerm = "", inStockOnly = false, sortBy = "featured" } = filters;
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const nextProducts = Array.isArray(products) ? [...products] : [];

  const filteredProducts = normalizedSearchTerm
    ? nextProducts.filter((product) =>
        buildProductSearchText(product).includes(normalizedSearchTerm)
      )
    : nextProducts;

  const availableProducts = inStockOnly
    ? filteredProducts.filter((product) => product.stock > 0)
    : filteredProducts;

  switch (sortBy) {
    case "price-low":
      return availableProducts.sort((a, b) => a.price - b.price);
    case "price-high":
      return availableProducts.sort((a, b) => b.price - a.price);
    case "rating":
      return availableProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "discount":
      return availableProducts.sort(
        (a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
      );
    default:
      return availableProducts;
  }
}

export function countActiveProductFilters({
  searchTerm = "",
  inStockOnly = false,
  sortBy = "featured",
}: ProductFilters) {
  return (
    (searchTerm.trim() ? 1 : 0) +
    (sortBy !== "featured" ? 1 : 0) +
    (inStockOnly ? 1 : 0)
  );
}

export function getMaxProductQuantity(stock = 1) {
  return Math.max(1, Math.min(stock ?? 1, MAX_PRODUCT_QUANTITY));
}

export function getSafeProductQuantity(value: number, stock = 1) {
  const maxAllowedQuantity = getMaxProductQuantity(stock);
  return Math.min(maxAllowedQuantity, Math.max(1, value));
}

export function buildProductSharePayload(product: Product, url: string) {
  return {
    title: product.title,
    text: `Check out ${product.title} on Aura-Market`,
    url,
  };
}
