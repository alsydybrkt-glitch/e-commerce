"use client";
import { Suspense, lazy, use } from "react";
import { Product } from "@/features/products/services/productsApi";
import { useTranslation } from "@/shared/i18n/useTranslation";

import RenderWhenVisible from "@/shared/ui/RenderWhenVisible";

const SlideProduct = lazy(() => import("@/features/products/slide-product/SlideProduct"));

interface RelatedProductsProps {
  category: string;
  productsPromise: Promise<Product[]>;
}

export function RelatedProducts({ category, productsPromise }: RelatedProductsProps) {
  const { t, tCategoryDescription } = useTranslation();
  const products = use(productsPromise);

  if (!products || products.length === 0) return null;

  return (
    <RenderWhenVisible minHeight={620} rootMargin="200px">
      <Suspense fallback={<div className="h-40 animate-pulse bg-slate-100 dark:bg-slate-800/40 rounded-3xl" />}>
        <SlideProduct 
          category={category} 
          products={products} 
          description={tCategoryDescription(category)} 
        />
      </Suspense>
    </RenderWhenVisible>
  );
}
