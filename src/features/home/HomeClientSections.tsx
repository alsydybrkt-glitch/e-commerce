"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { fetchProductsByCategory } from "@/features/products/store/productsSlice";
import { getRecentlyViewed } from "@/features/products/utils/product-tools";
import RenderWhenVisible from "@/shared/ui/RenderWhenVisible";
import { Product as ProductType, Category } from "@/features/products/services/productsApi";
import { AppDispatch, RootState } from "@/store";
import { PromoBanner } from "@/shared/ui/PromoBanner";
import { getTranslations } from "@/shared/i18n/get-translations";

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

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
  onVisible?: () => void;
}

const LazySection = ({
  children,
  className,
  minHeight = 400,
  rootMargin = "400px",
  onVisible,
}: LazySectionProps) => {
  return (
    <RenderWhenVisible
      className={className}
      minHeight={minHeight}
      rootMargin={rootMargin}
      onVisible={onVisible}
    >
      {children}
    </RenderWhenVisible>
  );
};

export function RecentlyViewedSection({ locale }: { locale: string }) {
  const [recentlyViewed, setRecentlyViewed] = useState<ProductType[]>([]);
  const { t } = getTranslations(locale as any);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
  }, []);

  if (recentlyViewed.length === 0) return null;

  return (
    <LazySection className="deferred-section" minHeight={540}>
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
  const dispatch = useDispatch<AppDispatch>();
  const clientProducts = useSelector((state: RootState) => state.products.items);
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
      {initialCategories.map((category: Category, index: number) => (
        <div key={category.slug}>
          <LazySection
            className="deferred-section"
            minHeight={620}
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

          {/* High-impact Mid-page Promotional Banner */}
          {index === 1 && (
            <PromoBanner 
              title="Elevate Your Sound Experience"
              subtitle="Discover our curated audio collection with premium noise cancellation and immersive clarity."
              ctaText="Explore Audio"
              imageSrc="/images/img/hero-banner-3.jpg"
              className="bg-surface-secondary/30 dark:bg-slate-900/20"
            />
          )}
        </div>
      ))}
    </>
  );
}
