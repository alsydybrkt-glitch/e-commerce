"use client";

import { useEffect, useMemo, useState } from "react";
// hooks are imported from @/store directly
import dynamic from "next/dynamic";
import { fetchProductsByCategory } from "@/features/products/store/productsSlice";
import { getRecentlyViewed } from "@/shared/utils/product-tools";
import { Product as ProductType, Category } from "@/services/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/store";
import LazySection from "@/shared/ui/LazySection";
import { getTranslations } from "@/config/i18n/get-translations";

const SlideProduct = dynamic(
  () => import("@/features/products/slide-product/SlideProduct"),
  {
    loading: () => (
      <section className="shell py-20">
        <div className="mb-8 h-16 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/50" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800/50"
            />
          ))}
        </div>
      </section>
    ),
  }
);

// Removed local LazySection - now using shared LazySection

export function RecentlyViewedSection({ locale }: { locale: string }) {
  const [recentlyViewed, setRecentlyViewed] = useState<ProductType[]>([]);
  const { t } = getTranslations(locale as any);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
  }, []);

  if (recentlyViewed.length === 0) return null;

  return (
    <LazySection 
      className="deferred-section" 
      minHeightDesktop={900} 
      minHeightMobile={850}
      id="recently-viewed"
    >
      <SlideProduct
        kicker={t("home.recentlyViewedKicker")}
        category={t("home.recentlyViewedTitle")}
        description={t("home.recentlyViewedCopy")}
        products={recentlyViewed}
      />
    </LazySection>
  );
}

interface CategorySlidesSectionProps {
  initialCategories: Category[];
  initialProducts: Record<string, ProductType[]>;
  locale: string;
}

export function CategorySlidesSection({ initialCategories, initialProducts, locale }: CategorySlidesSectionProps) {
  const dispatch = useAppDispatch();
  const clientProducts = useAppSelector((state) => state.products.items);
  const { tCategoryName } = getTranslations(locale as any);

  const products = useMemo(() => ({
    ...initialProducts,
    ...clientProducts
  }), [initialProducts, clientProducts]);

  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);

  useEffect(() => {
    visibleCategories.forEach((categoryName) => {
      if (!products[categoryName]) {
        dispatch(fetchProductsByCategory(categoryName));
      }
    });
  }, [dispatch, products, visibleCategories]);

  return (
    <>
      {initialCategories.slice(0, 2).map((category: Category, index: number) => (
        <div key={category.slug}>
          <LazySection
            className="deferred-section"
            minHeightDesktop={950}
            minHeightMobile={900}
            id={`category-${category.slug}`}
            onVisible={() =>
              setVisibleCategories((prev) =>
                prev.includes(category.slug) ? prev : [...prev, category.slug],
              )
            }
          >
            <SlideProduct
              products={products[category.slug]}
              category={tCategoryName(category.slug)}
              description={category.description || ""}
            />
          </LazySection>


        </div>
      ))}
    </>
  );
}
