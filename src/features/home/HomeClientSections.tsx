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

import SlideProduct from "@/features/products/slide-product/SlideProduct";

// Removed local LazySection - now using shared LazySection

export function RecentlyViewedSection({ locale, initialHasItems }: { locale: string, initialHasItems?: boolean }) {
  const [recentlyViewed, setRecentlyViewed] = useState<ProductType[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const { t } = getTranslations(locale as any);

  useEffect(() => {
    const items = getRecentlyViewed();
    setRecentlyViewed(items);
    setHasHydrated(true);
  }, []);

  // During SSR and first client render, we use initialHasItems to decide if we show the skeleton.
  // After hydration, we use the actual length.
  const showSection = hasHydrated ? recentlyViewed.length > 0 : !!initialHasItems;

  if (!showSection) return null;

  return (
    <LazySection 
      className="deferred-section" 
      minHeightDesktop={400} 
      minHeightMobile={350}
      id="recently-viewed"
    >
      <SlideProduct
        kicker={t("home.recentlyViewedKicker")}
        category={t("home.recentlyViewedTitle")}
        description={t("home.recentlyViewedCopy")}
        products={recentlyViewed.length > 0 ? recentlyViewed : []}
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
            minHeightDesktop={750}
            minHeightMobile={700}
            id={`category-${category.slug}`}
            eager={index === 0}
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
