import SearchQueryClient from "@/features/products/components/SearchQueryClient";
import ServerPagination from "@/features/products/components/ServerPagination";
import { Product as ProductType } from "@/services/api/productsApi";
import ProductGrid from "./components/ProductGrid";

type RawSearchParams = Record<string, string | string[] | undefined>;

interface SearchPageProps {
  query: string;
  products: ProductType[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  searchParams?: RawSearchParams;
  locale: string;
}

export default function SearchPage({
  query,
  products,
  totalProducts,
  currentPage,
  totalPages,
  searchParams,
  locale,
}: SearchPageProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <div className="shell py-8">
      <header className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Search results
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          {hasQuery ? `Results for "${query}"` : "Search products"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {hasQuery
            ? `${totalProducts} matching product${totalProducts === 1 ? "" : "s"}`
            : "Enter a keyword to start browsing products."}
        </p>
      </header>

      <SearchQueryClient initialQuery={query} />

      {!hasQuery ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/40">
          <h2 className="text-lg font-bold">Start with a search keyword</h2>
          <p className="mt-2 text-sm text-slate-500">
            You can search by product name, brand, or category.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/40">
          <h2 className="text-lg font-bold">No products found</h2>
          <p className="mt-2 text-sm text-slate-500">
            Try another keyword and run the search again.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <ProductGrid products={products} />
        </div>
      )}

      {hasQuery && (
        <ServerPagination
          pathname="/search"
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
          locale={locale}
        />
      )}
    </div>
  );
}
