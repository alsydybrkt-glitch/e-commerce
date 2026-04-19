import { getTranslations } from "@/config/i18n/get-translations";
import ServerPagination from "@/features/products/components/ServerPagination";
import ShopFiltersClient from "@/features/products/components/ShopFiltersClient";
import ProductGrid from "@/features/products/components/ProductGrid";
import { ShopSortKey } from "@/constants/shop";
import { Category, Product as ProductType } from "@/services/api/productsApi";

type RawSearchParams = Record<string, string | string[] | undefined>;

interface ShopPageProps {
  categories: Category[];
  activeCategory: string;
  products: ProductType[];
  totalFilteredProducts: number;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  sortBy: ShopSortKey;
  inStockOnly: boolean;
  searchParams?: RawSearchParams;
  locale: string;
}

export default function ShopPage({
  categories,
  activeCategory,
  products,
  totalFilteredProducts,
  currentPage,
  totalPages,
  searchTerm,
  sortBy,
  inStockOnly,
  searchParams,
  locale,
}: ShopPageProps) {
  const { t } = getTranslations(locale);

  const hasProducts = products.length > 0;

  return (
    <section className="section-gap overflow-x-hidden pt-6 sm:pt-10">
      {/* HERO SECTION */}
      <header className="shell mb-12 text-center sm:text-left">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          {t("shop.mainTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:mx-0 sm:max-w-xl sm:text-base">
          {t("shop.mainDescription")}
        </p>
      </header>

      {/* FILTER SECTION */}
      <div className="shell">
        <ShopFiltersClient
          categories={categories}
          activeCategory={activeCategory}
          sortBy={sortBy}
          inStockOnly={inStockOnly}
          searchTerm={searchTerm}
        />

        {/* RESULTS HEADER */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-900/50">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {t("shop.showingCount", {
              count: products.length,
              total: totalFilteredProducts,
            })}
          </span>
          <div className="hidden flex-1 ms-6 h-px bg-slate-100 dark:bg-slate-900 sm:block" />
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="shell">
        {!hasProducts ? (
          <div className="rounded-[40px] border-2 border-dashed border-slate-200 bg-slate-50/40 px-6 py-24 text-center dark:border-slate-800/50 dark:bg-slate-900/10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {t("shop.emptyTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-slate-500">
              {t("shop.emptyCopy")}
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}

        {/* PAGINATION */}
        <div className="mt-16 sm:mt-20">
          <ServerPagination
            pathname="/shop"
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
