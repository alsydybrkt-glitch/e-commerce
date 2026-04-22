"use client";

import { Product as ProductType } from "@/services/api/productsApi";
import SlideProduct from "@/features/products/slide-product/SlideProduct";
import RenderWhenVisible from "@/shared/ui/RenderWhenVisible";
import { getTranslations } from "@/config/i18n/get-translations";
import { SortDropdown } from "./components/SortDropdown";
import { m } from "framer-motion";

const CATEGORY_COLORS: Record<string, { from: string; via: string; to: string; text: string; kicker: string; glow: string }> = {
  electronics: { from: "from-blue-600", via: "via-blue-500", to: "to-blue-700", text: "text-blue-500", kicker: "bg-blue-500/10", glow: "bg-blue-500/20" },
  laptops:     { from: "from-violet-600", via: "via-violet-500", to: "to-violet-700", text: "text-violet-500", kicker: "bg-violet-500/10", glow: "bg-violet-500/20" },
  fragrances:  { from: "from-rose-600", via: "via-rose-500", to: "to-rose-700", text: "text-rose-500", kicker: "bg-rose-500/10", glow: "bg-rose-500/20" },
  skincare:    { from: "from-emerald-600", via: "via-emerald-500", to: "to-emerald-700", text: "text-emerald-500", kicker: "bg-emerald-500/10", glow: "bg-emerald-500/20" },
  groceries:   { from: "from-amber-600", via: "via-amber-500", to: "to-amber-700", text: "text-amber-500", kicker: "bg-amber-500/10", glow: "bg-amber-500/20" },
  "home-decoration": { from: "from-sky-600", via: "via-sky-500", to: "to-sky-700", text: "text-sky-500", kicker: "bg-sky-500/10", glow: "bg-sky-500/20" },
  furniture:   { from: "from-indigo-600", via: "via-indigo-500", to: "to-indigo-700", text: "text-indigo-500", kicker: "bg-indigo-500/10", glow: "bg-indigo-500/20" },
  tops:        { from: "from-teal-600", via: "via-teal-500", to: "to-teal-700", text: "text-teal-500", kicker: "bg-teal-500/10", glow: "bg-teal-500/20" },
};

function getCategoryColor(slug: string) {
  return CATEGORY_COLORS[slug] || { 
    from: "from-slate-900", 
    via: "via-slate-800", 
    to: "to-slate-900", 
    text: "text-brand-500", 
    kicker: "bg-brand-500/10", 
    glow: "bg-brand-500/10" 
  };
}

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

export default function CategoryPage({
  categorySlug,
  products,
  totalProducts,
  currentPage,
  totalPages,
  searchParams,
  locale,
}: CategoryPageProps) {
  const { t, tCategoryName } = getTranslations(locale as any);
  
  const categoryTitle = tCategoryName(categorySlug);

  const color = getCategoryColor(categorySlug);

  return (
    <div className="min-h-[80vh] bg-[#fcfcfd] dark:bg-slate-950/20">
      <section className="shell overflow-x-hidden pt-6 sm:pt-10">
        <div className={`
          relative overflow-hidden rounded-[1rem] p-8 sm:p-14 shadow-sm transition-all duration-500
          bg-white border border-slate-100 dark:border-slate-800/50 dark:bg-slate-900/40
          dark:bg-gradient-to-br ${color.from} ${color.via} ${color.to}
        `}>
          {/* Decorative elements */}
          <div className={`absolute -right-20 -top-20 h-80 w-80 rounded-full ${color.glow} blur-[120px] opacity-60 dark:opacity-20`} />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px] opacity-40 dark:opacity-10" />
          
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />

          <div className="relative z-10">
            <m.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase
                ${color.kicker} border-current/10 ${color.text} dark:bg-white/10 dark:text-slate-200 dark:border-white/15
              `}
            >
              {t("category.kicker")}
            </m.p>

            <m.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-black tracking-tight sm:text-7xl text-slate-900 dark:text-white"
            >
              {categoryTitle}
            </m.h1>

            <m.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg font-medium text-slate-500 dark:text-slate-300/80 leading-relaxed"
            >
              {t("category.copy")}
            </m.p>

            <m.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-between gap-8"
            >
              <div className="flex flex-wrap gap-5">
                <div className="group flex flex-col rounded-3xl border border-slate-100 bg-slate-50/50 p-5 px-7 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm dark:hover:bg-white/10 dark:hover:shadow-none">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-400">
                    {t("category.totalProducts")}
                  </p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{totalProducts}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white/50 p-2 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                 <SortDropdown />
              </div>
            </m.div>
          </div>
        </div>
      </section>

      <section className="shell overflow-x-hidden pb-32 pt-16">
        {products.length > 0 ? (
          <SlideProduct
            category={categoryTitle}
            kicker={t("common.featured") || "Featured"}
            products={products}
            useShell={false}
            sectionPaddingClassName="py-0"
            hideHeader={false}
          />
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
