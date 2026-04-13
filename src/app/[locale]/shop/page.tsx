import { Metadata } from "next";
import ShopPage from "@/features/products/ShopPage";
import {
  SHOP_SORT_KEYS,
  ShopSortKey,
} from "@/features/products/constants/shop";
import { filterAndSortProducts } from "@/features/products/utils/product-helpers";
import {
  fetchAllCategoryProducts,
  fetchAllProductCategories,
} from "@/features/products/services/productsApi";

const SHOP_PAGE_SIZE = 12;

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function toSingleValue(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return "";
}

function parsePage(value: string | string[] | undefined) {
  const parsed = Number.parseInt(toSingleValue(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function parseSort(value: string | string[] | undefined): ShopSortKey {
  const next = toSingleValue(value);
  return SHOP_SORT_KEYS.includes(next as ShopSortKey)
    ? (next as ShopSortKey)
    : "featured";
}

export const metadata: Metadata = {
  title: "Shop Full Catalog | Aura-Market",
  description: "Browse our entire collection of premium products. Find everything you need with Aura-Market's intuitive discovery experience.",
  alternates: {
    canonical: "/shop",
  },
};

export default async function Page({ searchParams = {} }: PageProps) {
  const categories = await fetchAllProductCategories();
  const firstCategory = categories[0]?.slug ?? "";
  const requestedCategory = toSingleValue(searchParams.category);
  const activeCategory = categories.some((item) => item.slug === requestedCategory)
    ? requestedCategory
    : firstCategory;

  if (!activeCategory) {
    return (
      <ShopPage
        categories={[]}
        activeCategory=""
        products={[]}
        totalFilteredProducts={0}
        currentPage={1}
        totalPages={1}
        searchTerm=""
        sortBy="featured"
        inStockOnly={false}
        searchParams={searchParams}
      />
    );
  }

  const searchTerm = toSingleValue(searchParams.query).trim();
  const sortBy = parseSort(searchParams.sort);
  const inStockOnly = toSingleValue(searchParams.stock) === "1";
  const requestedPage = parsePage(searchParams.page);

  const categoryProducts = await fetchAllCategoryProducts(activeCategory);
  const filteredProducts = filterAndSortProducts(categoryProducts, {
    searchTerm,
    inStockOnly,
    sortBy,
  });

  const totalFilteredProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredProducts / SHOP_PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const offset = (currentPage - 1) * SHOP_PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(offset, offset + SHOP_PAGE_SIZE);

  return (
    <ShopPage
      categories={categories}
      activeCategory={activeCategory}
      products={paginatedProducts}
      totalFilteredProducts={totalFilteredProducts}
      currentPage={currentPage}
      totalPages={totalPages}
      searchTerm={searchTerm}
      sortBy={sortBy}
      inStockOnly={inStockOnly}
      searchParams={searchParams}
    />
  );
}
