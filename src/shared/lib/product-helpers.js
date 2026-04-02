export const DEFAULT_PRODUCT_IMAGE = "/images/default.png";
export const MAX_PRODUCT_QUANTITY = 10;

export function getProductImage(product) {
  return product?.images?.[0] ?? product?.thumbnail ?? DEFAULT_PRODUCT_IMAGE;
}

export function getProductGallery(product, limit) {
  const images = product?.images?.length
    ? product.images
    : [getProductImage(product)].filter(Boolean);

  return typeof limit === "number" ? images.slice(0, limit) : images;
}

export function getCategoryLabel(categorySlug = "") {
  return categorySlug.replace(/-/g, " ");
}

export function buildProductSearchText(product) {
  return [product?.title, product?.brand, product?.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterAndSortProducts(products, filters) {
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

export function countActiveProductFilters({ searchTerm, inStockOnly, sortBy }) {
  return (
    (searchTerm.trim() ? 1 : 0) +
    (sortBy !== "featured" ? 1 : 0) +
    (inStockOnly ? 1 : 0)
  );
}

export function getMaxProductQuantity(stock = 1) {
  return Math.max(1, Math.min(stock ?? 1, MAX_PRODUCT_QUANTITY));
}

export function getSafeProductQuantity(value, stock = 1) {
  const maxAllowedQuantity = getMaxProductQuantity(stock);
  return Math.min(maxAllowedQuantity, Math.max(1, value));
}

export function buildProductSharePayload(product, url) {
  return {
    title: product.title,
    text: `Check out ${product.title} on Al Saiedy Store`,
    url,
  };
}
