import { Product as ProductType } from "@/features/products/services/productsApi";
import SlideProduct from "@/features/products/slide-product/SlideProduct";
import RenderWhenVisible from "@/shared/ui/RenderWhenVisible";
import { getTranslations } from "@/shared/i18n/get-translations";
import { SortDropdown } from "./components/SortDropdown";

type RawSearchParams = Record<string, string | string[] | undefined>;

interface CategoryPageProps {
  categorySlug: string;
  products: ProductType[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  searchParams?: RawSearchParams;
  locale: string;
}

function formatCategoryLabel(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export default function CategoryPage({
  categorySlug,
  products,
  totalProducts,
  currentPage,
  totalPages,
  searchParams,
  locale,
}: CategoryPageProps) {
  const { t } = getTranslations(locale as any);
  
  const categoryTitle = formatCategoryLabel(categorySlug);

  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950/20">
      <section className="shell overflow-x-hidden pt-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white sm:p-12 shadow-2xl">
          {/* Decorative glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

          <div className="relative z-10">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-slate-200">
              {t("category.kicker")}
            </p>

            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{categoryTitle}</h1>

            <p className="mt-4 max-w-xl text-lg text-slate-300/80 leading-relaxed">
              {t("category.copy")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {t("category.totalProducts")}
                  </p>
                  <p className="mt-1 text-xl font-bold text-white">{totalProducts}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                 <SortDropdown />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell overflow-x-hidden pb-32 pt-16">
        {products.length > 0 ? (
          <RenderWhenVisible minHeight={600}>
            <SlideProduct
              category={categoryTitle}
              kicker={t("common.featured") || "Featured"}
              products={products}
              useShell={false}
              sectionPaddingClassName="py-0"
              hideHeader={false}
            />
          </RenderWhenVisible>
        ) : (
          <div className="rounded-[32px] border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center dark:border-slate-800 dark:bg-slate-900/20">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("category.noProducts")}</h2>
            <p className="mt-2 text-slate-500">
              {t("category.noProductsDesc")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
