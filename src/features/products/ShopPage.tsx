import { getTranslations } from "@/shared/i18n/get-translations";
import ServerPagination from "@/features/products/components/ServerPagination";
import ShopFiltersClient from "@/features/products/components/ShopFiltersClient";
import { ShopSortKey } from "@/features/products/constants/shop";
import { Category, Product as ProductType } from "@/features/products/services/productsApi";
import Product from "@/features/products/slide-product/product";
import SlideProduct from "@/features/products/slide-product/SlideProduct";
import RenderWhenVisible from "@/shared/ui/RenderWhenVisible";

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

  return (
    <section className="section-gap overflow-x-hidden">
      <header className="shell mb-6">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t("shop.mainTitle")}</h1>
        <p className="mt-2 text-sm text-slate-500 max-w-xl">
          {t("shop.mainDescription")}
        </p>
      </header>

      <div className="shell">
        <ShopFiltersClient
          categories={categories}
          activeCategory={activeCategory}
          searchTerm={searchTerm}
          sortBy={sortBy}
          inStockOnly={inStockOnly}
        />

        <div className="mb-8 ml-1 text-sm font-medium text-slate-400">
          {t("shop.showing", { count: products.length, total: totalFilteredProducts })}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="shell">
          <div className="rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-20 text-center dark:border-slate-800 dark:bg-slate-900/20">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("shop.emptyTitle")}</h2>
            <p className="mt-2 text-slate-500">
              {t("shop.emptyCopy")}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <SlideProduct
            category={activeCategory || "Shop"}
            products={products}
            hideHeader={true}
            useShell={true} // Use internal shell for consistent bleed
            sectionPaddingClassName="py-4"
          />
        </div>
      )}

      <div className="shell mt-12">
        <ServerPagination
          pathname="/shop"
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
          locale={locale}
        />
      </div>
    </section>
  );
}
