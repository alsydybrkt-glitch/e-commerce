const BASE_URL = "https://dummyjson.com/products";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus?: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
  description?: string;
}

export interface ProductQueryOptions {
  skip?: number;
  limit?: number;
}

export interface CategoryProductsPage {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchProductsPage {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchProductById(productId: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${productId}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product with id: ${productId}`);
  }

  return res.json();
}

export async function fetchCategoryProductsPage(
  categorySlug: string,
  options: ProductQueryOptions = {}
): Promise<CategoryProductsPage> {
  const params = new URLSearchParams();

  if (typeof options.skip === "number") {
    params.set("skip", String(options.skip));
  }

  if (typeof options.limit === "number") {
    params.set("limit", String(options.limit));
  }

  const query = params.toString();
  const res = await fetch(`${BASE_URL}/category/${categorySlug}${query ? `?${query}` : ""}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products for category: ${categorySlug}`);
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return {
      products: data,
      total: data.length,
      skip: options.skip ?? 0,
      limit: options.limit ?? data.length,
    };
  }

  return {
    products: Array.isArray(data?.products) ? data.products : [],
    total: Number.isFinite(data?.total) ? data.total : (data?.products?.length ?? 0),
    skip: Number.isFinite(data?.skip) ? data.skip : (options.skip ?? 0),
    limit: Number.isFinite(data?.limit)
      ? data.limit
      : (options.limit ?? data?.products?.length ?? 0),
  };
}

export async function fetchCategoryProducts(
  categorySlug: string,
  options: ProductQueryOptions = {}
): Promise<Product[]> {
  const data = await fetchCategoryProductsPage(categorySlug, options);
  return data.products;
}

export async function fetchAllCategoryProducts(
  categorySlug: string
): Promise<Product[]> {
  const pageSize = 100;
  const firstPage = await fetchCategoryProductsPage(categorySlug, {
    skip: 0,
    limit: pageSize,
  });

  const products = [...firstPage.products];
  const total = Number.isFinite(firstPage.total)
    ? firstPage.total
    : firstPage.products.length;

  while (products.length < total) {
    const nextPage = await fetchCategoryProductsPage(categorySlug, {
      skip: products.length,
      limit: pageSize,
    });

    if (!nextPage.products.length) {
      break;
    }

    products.push(...nextPage.products);
  }

  return products;
}

export async function fetchAllProductCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    next: { revalidate: 86400 }, // Cache categories for 1 day
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product categories");
  }

  return res.json();
}

export async function searchProducts(
  query: string,
  options: ProductQueryOptions = {}
): Promise<Product[]> {
  const data = await searchProductsPage(query, options);
  return data.products;
}

export async function searchProductsPage(
  query: string,
  options: ProductQueryOptions = {}
): Promise<SearchProductsPage> {
  const params = new URLSearchParams();
  params.set("q", query);

  if (typeof options.skip === "number") {
    params.set("skip", String(options.skip));
  }

  if (typeof options.limit === "number") {
    params.set("limit", String(options.limit));
  }

  const res = await fetch(
    `${BASE_URL}/search?${params.toString()}`,
    { cache: "no-store" } // Real-time search
  );

  if (!res.ok) {
    throw new Error(`Search failed for query: ${query}`);
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return {
      products: data,
      total: data.length,
      skip: options.skip ?? 0,
      limit: options.limit ?? data.length,
    };
  }

  return {
    products: Array.isArray(data?.products) ? data.products : [],
    total: Number.isFinite(data?.total) ? data.total : (data?.products?.length ?? 0),
    skip: Number.isFinite(data?.skip) ? data.skip : (options.skip ?? 0),
    limit: Number.isFinite(data?.limit)
      ? data.limit
      : (options.limit ?? data?.products?.length ?? 0),
  };
}
