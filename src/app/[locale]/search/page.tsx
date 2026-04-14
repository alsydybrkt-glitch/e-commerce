import { Metadata } from "next";
import SearchPage from "@/features/products/SearchPage";
import { searchProductsPage } from "@/features/products/services/productsApi";

const SEARCH_PAGE_SIZE = 12;

type PageProps = {
  params: { locale: string };
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

export async function generateMetadata({
  searchParams = {},
}: PageProps): Promise<Metadata> {
  const query = toSingleValue(searchParams.query).trim();

  if (!query) {
    return {
      title: "Search Catalog | Aura-Market",
      description: "Search across thousands of premium products in Aura-Market's extensive catalog.",
      alternates: {
        canonical: "/search",
      },
    };
  }

  return {
    title: `Search "${query}" | Aura-Market`,
    description: `Found results for "${query}" at Aura-Market. Shop the best selection of products matching your search.`,
    alternates: {
      canonical: `/search?query=${encodeURIComponent(query)}`,
    },
  };
}

export default async function Page({ params, searchParams = {} }: PageProps) {
  const { locale } = params;
  const query = toSingleValue(searchParams.query).trim();

  if (!query) {
    return (
      <SearchPage
        query=""
        products={[]}
        totalProducts={0}
        currentPage={1}
        totalPages={1}
        searchParams={searchParams}
        locale={locale}
      />
    );
  }

  const requestedPage = parsePage(searchParams.page);
  let currentPage = requestedPage;

  let productsPage = await searchProductsPage(query, {
    skip: (currentPage - 1) * SEARCH_PAGE_SIZE,
    limit: SEARCH_PAGE_SIZE,
  });

  const totalProducts = Number.isFinite(productsPage.total)
    ? productsPage.total
    : productsPage.products.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / SEARCH_PAGE_SIZE));

  if (currentPage > totalPages) {
    currentPage = totalPages;
    productsPage = await searchProductsPage(query, {
      skip: (currentPage - 1) * SEARCH_PAGE_SIZE,
      limit: SEARCH_PAGE_SIZE,
    });
  }

  return (
    <SearchPage
      query={query}
      products={productsPage.products}
      totalProducts={totalProducts}
      currentPage={currentPage}
      totalPages={totalPages}
      searchParams={searchParams}
      locale={locale}
    />
  );
}
