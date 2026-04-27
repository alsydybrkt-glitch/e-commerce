"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProductsByCategory } from "@/features/products/store/productsSlice";
import { Product as ProductType } from "@/services/api/productsApi";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { BestSellersContent } from "./BestSellersContent";
import { BestSellersHeader } from "./BestSellersHeader";
import { BestSellersTabs } from "./BestSellersTabs";

const FEATURED_CATEGORIES = ["smartphones", "laptops", "mobile-accessories"];

function uniqueProducts(products: ProductType[]) {
  return Array.from(new Map(products.map((product) => [product.id, product])).values());
}

function sortByRating(products: ProductType[]) {
  return [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}

function sortByDiscount(products: ProductType[]) {
  return [...products].sort(
    (a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
  );
}

function getTabProducts(products: ProductType[], activeTab: string) {
  switch (activeTab) {
    case "best":
      return sortByRating(products).filter((product) => (product.rating ?? 0) >= 4.5);
    case "discount":
      return sortByDiscount(products).filter(
        (product) => (product.discountPercentage ?? 0) > 0
      );
    case "top":
      return sortByRating(products);
    case "new":
      return [...products].sort((a, b) => Number(b.id) - Number(a.id));
    default:
      return products;
  }
}

export default function TrustSection() {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile(768);
  const requestedCategories = useRef(new Set<string>());
  const [activeTab, setActiveTab] = useState("all");

  const { items = {}, homeStatus } = useAppSelector((state) => state.products);

  useEffect(() => {
    FEATURED_CATEGORIES.forEach((category) => {
      if (!items[category]?.length && !requestedCategories.current.has(category)) {
        requestedCategories.current.add(category);
        dispatch(fetchProductsByCategory({ category, limit: 8 }));
      }
    });
  }, [dispatch, items]);

  const allProducts = useMemo(() => {
    return uniqueProducts(
      FEATURED_CATEGORIES.flatMap((category) => items[category] ?? [])
    );
  }, [items]);

  const products = useMemo(
    () => getTabProducts(allProducts, activeTab),
    [activeTab, allProducts]
  );

  const isLoading = homeStatus === "loading" && allProducts.length === 0;

  if (!isLoading && allProducts.length === 0) return null;

  return (
    <section className="shell section-gap">
      <BestSellersHeader />
      <BestSellersTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <BestSellersContent
        products={products}
        isLoading={isLoading}
        isMobile={isMobile}
        activeTab={activeTab}
      />
    </section>
  );
}
