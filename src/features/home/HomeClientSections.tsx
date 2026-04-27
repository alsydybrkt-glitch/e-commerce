"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fetchProductsByCategory } from "@/features/products/store/productsSlice";
import { getRecentlyViewed } from "@/shared/utils/product-tools";
import { Product as ProductType, Category } from "@/services/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/store";
import LazySection from "@/shared/ui/LazySection";
import { getTranslations } from "@/config/i18n/get-translations";
import SlideProduct from "@/features/products/slide-product/SlideProduct";

const MAX_VISIBLE_CATEGORIES = 1;

// ─────────────────────────────────────────────
// RecentlyViewedSection
// ─────────────────────────────────────────────

interface RecentlyViewedSectionProps {
  locale: string;
  /** عدد العناصر المحفوظة في SSR لتجنب Layout Shift */
  initialCount?: number;
}

export function RecentlyViewedSection({
  locale,
  initialCount = 0,
}: RecentlyViewedSectionProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<ProductType[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Fix #1 — memo للترجمة
  const { t } = useMemo(() => getTranslations(locale as any), [locale]);

  useEffect(() => {
    const items = getRecentlyViewed();
    setRecentlyViewed(items);
    setHasHydrated(true);
  }, []);

  // Fix #4 — استخدام العدد بدل boolean لتجنب Layout Shift
  const showSection = hasHydrated
    ? recentlyViewed.length > 0
    : initialCount > 0;

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
        products={recentlyViewed}
      />
    </LazySection>
  );
}

// ─────────────────────────────────────────────
// CategorySlidesSection
// ─────────────────────────────────────────────

interface CategorySlidesSectionProps {
  initialCategories: Category[];
  initialProducts: Record<string, ProductType[]>;
  locale: string;
}

export function CategorySlidesSection({
  initialCategories,
  initialProducts,
  locale,
}: CategorySlidesSectionProps) {
  const dispatch = useAppDispatch();
  const clientProducts = useAppSelector((state) => state.products.items);

  // Fix #1 — memo للترجمة
  const { tCategoryName } = useMemo(
    () => getTranslations(locale as any),
    [locale]
  );

  // Fix #2 — merge strategy صح: clientProducts تطغى بس لو عندها data فعلية
  const products = useMemo(() => {
    const merged: Record<string, ProductType[]> = { ...initialProducts };
    Object.entries(clientProducts).forEach(([key, val]) => {
      if (val?.length) merged[key] = val;
    });
    return merged;
  }, [initialProducts, clientProducts]);

  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);

  // Fix #3 — useRef لمنع double dispatch
  const fetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    visibleCategories.forEach((categoryName) => {
      if (
        !fetchedRef.current.has(categoryName) &&
        !products[categoryName]?.length
      ) {
        fetchedRef.current.add(categoryName);
        dispatch(fetchProductsByCategory(categoryName));
      }
    });
  }, [dispatch, visibleCategories]); // Fix #3 — أزلنا products من deps

  const handleVisible = (slug: string) => {
    setVisibleCategories((prev) =>
      prev.includes(slug) ? prev : [...prev, slug]
    );
  };

  return (
    <>
      {/* Fix #5 — MAX_VISIBLE_CATEGORIES بدل hardcoded 2 */}
      {initialCategories
        .filter(c => c.slug === "smartphones") // اختيار قسم الهواتف فقط كمثال بدلاً من الجمال
        .slice(0, MAX_VISIBLE_CATEGORIES)
        .map((category: Category, index: number) => (
          <LazySection
            key={category.slug}
            className="deferred-section"
            minHeightDesktop={750}
            minHeightMobile={700}
            id={`category-${category.slug}`}
            eager={true}
            onVisible={() => handleVisible(category.slug)}
          >
            <SlideProduct
              products={products[category.slug]}
              category={tCategoryName(category.slug)}
              description={category.description ?? ""}
            />
          </LazySection>
        ))}
    </>
  );
}