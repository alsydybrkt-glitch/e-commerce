import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import AuraHero from "@/shared/ui/hero-slider/AuraHero";
import { getProductImage } from "@/shared/utils/product-helpers";
import { Product as ProductType, Category } from "@/services/api/productsApi";
import { getTranslations } from "@/config/i18n/get-translations";

// UI Components
const TrustBar = dynamic(() => import("@/shared/ui/TrustBar").then(mod => mod.TrustBar), {
  loading: () => <div className="h-20 animate-pulse bg-slate-50 dark:bg-slate-900/50" />,
});
const Newsletter = dynamic(() => import("@/shared/ui/Newsletter").then(mod => mod.Newsletter), {
  loading: () => <div className="h-64 animate-pulse bg-slate-50 dark:bg-slate-900/50" />,
  ssr: false
});
import { RecentlyViewedSection, CategorySlidesSection } from "./HomeClientSections";
import LazySection from "@/shared/ui/LazySection";

// Lazy load non-critical sections
const CategoriesGrid = dynamic(
  () => import("@/features/products/categories-grid/CategoriesGrid"),
  {
    loading: () => (
      <section className="shell section-gap">
        <div className="mb-8 h-16 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/50" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800/50"
            />
          ))}
        </div>
      </section>
    ),
  }
);

const TrustSection = dynamic(() => import("@/shared/ui/trust-section/TrustSection"), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800/50" />,
});

const categoryInf = [
  { subtitleKey: "categories.smartphones.name", apiName: "smartphones" },
  { subtitleKey: "categories.laptops.name", apiName: "laptops" },
  {
    subtitleKey: "categories.mobile-accessories.name",
    apiName: "mobile-accessories",
  },
];

interface HomePageProps {
  initialCategories: Category[];
  initialProducts: Record<string, ProductType[]>;
  locale: string;
}

export default function HomePage({ initialCategories, initialProducts, locale }: HomePageProps) {
  const { t, tCategoryName } = getTranslations(locale as any);

  const categoriesData = categoryInf.map((categoryItem) => {
    const product = initialProducts?.[categoryItem.apiName]?.[0];

    return {
      subtitle: t(categoryItem.subtitleKey),
      title: tCategoryName(categoryItem.apiName),
      slug: categoryItem.apiName,
      img: getProductImage(product),
    };
  });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <AuraHero />
      
      {/* Strategic Trust Bar */}
      <TrustBar />

      <CategoriesGrid categories={categoriesData} />

      {/* Featured / Recently Viewed */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-50 dark:bg-slate-900/10" />}>
        <RecentlyViewedSection locale={locale} />
      </Suspense>

      {/* Category Sections with Integrated Mid-page Banner */}
      <Suspense fallback={<div className="h-screen animate-pulse bg-slate-50 dark:bg-slate-900/10" />}>
        <CategorySlidesSection 
          initialCategories={initialCategories} 
          initialProducts={initialProducts} 
          locale={locale} 
        />
      </Suspense>

      {/* Benefits Content / Social Trust */}
      <LazySection 
        minHeightDesktop={1550} 
        minHeightMobile={800}
        id="performance-picks"
      >
        <TrustSection />
      </LazySection>

      {/* Retention Layer */}
      <Newsletter />
    </div>
  );
}
