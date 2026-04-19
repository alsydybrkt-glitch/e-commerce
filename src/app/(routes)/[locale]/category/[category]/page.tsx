import CategoryPage from "@/features/products/CategoryPage";
import { Metadata } from "next";
import { fetchCategoryProductsPage } from "@/services/api/productsApi";
import { notFound } from "next/navigation";

const CATEGORY_PAGE_SIZE = 50;

type PageProps = {
  params: { category: string; locale: string };
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

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.category);
  const formattedTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  return {
    title: `${formattedTitle} | Aura`,
    description: `Discover our premium selection of ${formattedTitle}. High-quality products and exclusive deals only at Aura.`,
    alternates: {
      canonical: `/category/${params.category}`,
    },
  };
}

export default async function Page({ params, searchParams = {} }: PageProps) {
  const categorySlug = decodeURIComponent(params.category);
  const requestedPage = parsePage(searchParams.page);
  const sort = toSingleValue(searchParams.sort);

  // Map our internal sort keys to DummyJSON API parameters
  let sortBy = "";
  let order: "asc" | "desc" = "asc";

  if (sort === "price-low") {
    sortBy = "price";
    order = "asc";
  } else if (sort === "price-high") {
    sortBy = "price";
    order = "desc";
  } else if (sort === "rating") {
    sortBy = "rating";
    order = "desc";
  }

  try {
    let currentPage = requestedPage;
    let productsPage = await fetchCategoryProductsPage(categorySlug, {
      skip: (currentPage - 1) * CATEGORY_PAGE_SIZE,
      limit: CATEGORY_PAGE_SIZE,
      ...(sortBy ? { sortBy, order } : {}),
    } as any);

    const totalProducts = Number.isFinite(productsPage.total)
      ? productsPage.total
      : productsPage.products.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / CATEGORY_PAGE_SIZE));

    if (currentPage > totalPages) {
      currentPage = totalPages;
      productsPage = await fetchCategoryProductsPage(categorySlug, {
        skip: (currentPage - 1) * CATEGORY_PAGE_SIZE,
        limit: CATEGORY_PAGE_SIZE,
        ...(sortBy ? { sortBy, order } : {}),
      } as any);
    }


    return (
      <CategoryPage
        categorySlug={categorySlug}
        products={productsPage.products}
        totalProducts={totalProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
        locale={params.locale}
      />
    );
  } catch {
    return notFound();
  }
}
