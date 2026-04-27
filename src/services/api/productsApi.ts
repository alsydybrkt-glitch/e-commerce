import { apiClient, RequestOptions } from "./apiClient";

// ================= CACHE CONSTANTS =================

const CACHE = {
  PRODUCT: 600,      // 10 minutes
  CATEGORY: 60,      // 1 minute
  CATEGORIES: 3600,  // 1 hour
} as const;

// ================= TYPES =================
// ... (omitting types as they remain the same)
// I'll keep the types from the original file

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

export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

// ================= HELPERS =================

function normalizePaginatedData<T>(
  data: any,
  options: ProductQueryOptions
): PaginatedResponse<T> {
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
    total: Number.isFinite(data?.total)
      ? data.total
      : data?.products?.length ?? 0,
    skip: Number.isFinite(data?.skip)
      ? data.skip
      : options.skip ?? 0,
    limit: Number.isFinite(data?.limit)
      ? data.limit
      : options.limit ?? data?.products?.length ?? 0,
  };
}

// ================= PRODUCTS =================

export async function fetchProductById(
  productId: string | number
): Promise<Product> {
  return apiClient<Product>(`/products/${productId}`, {
    next: { revalidate: CACHE.PRODUCT },
  } as RequestOptions);
}

// ================= CATEGORY =================

export async function fetchCategoryProductsPage(
  categorySlug: string,
  options: ProductQueryOptions = {}
): Promise<PaginatedResponse<Product>> {
  const data = await apiClient<any>(`/products/category/${categorySlug}`, {
    params: options as any,
    next: { revalidate: CACHE.CATEGORY },
  } as RequestOptions);

  return normalizePaginatedData<Product>(data, options);
}

export async function fetchCategoryProducts(
  categorySlug: string,
  options: ProductQueryOptions = {}
): Promise<Product[]> {
  const data = await fetchCategoryProductsPage(categorySlug, options);
  return data.products;
}

// ✅ Parallel fetching — بدل sequential loop
export async function fetchAllCategoryProducts(
  categorySlug: string
): Promise<Product[]> {
  const pageSize = 100;

  // جيب الصفحة الأولى عشان نعرف الـ total
  const firstPage = await fetchCategoryProductsPage(categorySlug, {
    skip: 0,
    limit: pageSize,
  });

  const total = firstPage.total;

  // لو الكل في صفحة واحدة، مش محتاجين نكمل
  if (total <= pageSize) return firstPage.products;

  // احسب عدد الصفحات المتبقية وجيبها كلها بالتوازي
  const remainingCount = Math.ceil((total - pageSize) / pageSize);

  const restPages = await Promise.all(
    Array.from({ length: remainingCount }, (_, i) =>
      fetchCategoryProductsPage(categorySlug, {
        skip: (i + 1) * pageSize,
        limit: pageSize,
      })
    )
  );

  return [firstPage, ...restPages].flatMap((p) => p.products);
}

// ================= CATEGORIES =================

// ✅ Fixed: API returns objects not strings
export async function fetchAllProductCategories(): Promise<Category[]> {
  const data = await apiClient<any>("/products/categories", {
    next: { revalidate: CACHE.CATEGORIES },
  } as RequestOptions);

  return data.map((cat: any) => ({
    slug: cat.slug,
    name: cat.name,
    url: cat.url,
  }));
}

// ================= SEARCH =================

export async function searchProductsPage(
  query: string,
  options: ProductQueryOptions = {}
): Promise<PaginatedResponse<Product>> {
  if (!query.trim()) {
    return {
      products: [],
      total: 0,
      skip: options.skip ?? 0,
      limit: options.limit ?? 0,
    };
  }

  const data = await apiClient<any>("/products/search", {
    params: { q: query, ...options } as any,
    cache: "no-store",
  });

  return normalizePaginatedData<Product>(data, options);
}

export async function searchProducts(
  query: string,
  options: ProductQueryOptions = {}
): Promise<Product[]> {
  const data = await searchProductsPage(query, options);
  return data.products;
}