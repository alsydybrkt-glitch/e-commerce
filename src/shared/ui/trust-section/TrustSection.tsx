"use client";

import { useMemo, useState, useEffect, useId } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { m, AnimatePresence } from "framer-motion";
import Product from "@/features/products/slide-product/ProductCard";
import { Product as ProductType } from "@/services/api/productsApi";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { fetchProductsByCategory } from "@/features/products/store/productsSlice";
// AppDispatch removed from import as we use hooks directly
import { useIsMobile } from "@/shared/hooks/useIsMobile";

const MobileProductSwiper = dynamic(() => import("@/features/products/slide-product/MobileProductSwiper"), {
  loading: () => (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:hidden">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="h-[400px] rounded-3xl bg-slate-100/50 dark:bg-slate-800/20 animate-pulse" />
      ))}
    </div>
  ),
  ssr: false,
});

function BestSellers() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items = {}, homeStatus } = useAppSelector((state) => state.products);
  const [activeTab, setActiveTab ] = useState("all");
  const isMobile = useIsMobile(1024);
  const uniqueId = useId().replace(/:/g, "");
  const paginationClass = `pagination-best-${uniqueId}`;

  // Ensure data availability on mount
  useEffect(() => {
    const hasData = Object.keys(items).length > 0;
    if (!hasData && homeStatus !== "loading") {
      // Fetch a mix of categories to populate the "Best Sellers" pool
      dispatch(fetchProductsByCategory("smartphones"));
      dispatch(fetchProductsByCategory("laptops"));
    }
  }, [dispatch, items, homeStatus]);

  const tabs = useMemo(
    () => [
      { key: "all", label: t("home.tabs.all") },
      { key: "best", label: t("home.tabs.best") },
      { key: "discount", label: t("home.tabs.discount") },
      { key: "top", label: t("home.tabs.top") },
      { key: "new", label: t("home.tabs.new") },
    ],
    [t]
  );

  const bestSellers = useMemo(() => {
    const allProducts = Object.values(items).filter(Array.isArray).flat();
    if (!allProducts.length) return [];

    let filtered = [];

    switch (activeTab) {
      case "best":
        filtered = allProducts.filter((product) => product.rating >= 4.5);
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filtered = allProducts.filter((product) => (product.discountPercentage || 0) >= 10);
        filtered.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        break;
      case "top":
        filtered = [...allProducts].sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        filtered = [...allProducts].slice().reverse();
        break;
      default:
        filtered = allProducts;
    }

    // Remove duplicates by ID and slice
    const unique = Array.from(new Map(filtered.map(p => [p.id, p])).values());
    return unique.slice(0, 6);
  }, [items, activeTab]);

  const isLoading = homeStatus === "loading" && bestSellers.length === 0;

  return (
    <section className="shell section-gap">
      <div className="glass overflow-hidden p-5 sm:p-8 lg:p-10 shadow-2xl relative rounded-[40px] dark:bg-slate-900/10 dark:border-white/5 border-white/40">
        {/* Subtle background decorative element */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="section-kicker !bg-brand-500/10 !text-brand-600 dark:!text-brand-400 !border-brand-500/20">
                {t("home.performancePicks")}
              </span>
              <h2 className="section-title mt-4 text-3xl sm:text-4xl font-black tracking-tight">
                {t("home.performanceTitle")}
              </h2>
            </div>
            <button 
              className="btn btn-secondary group flex items-center gap-2 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900" 
              onClick={() => router.push("/shop")}
            >
              {t("common.viewAllProducts")}
              <m.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                →
              </m.span>
            </button>
          </div>

          {/* Premium Animated Tabs */}
          <div className="mb-12 flex flex-wrap gap-2 sm:gap-3 p-1 rounded-[22px] bg-slate-100/50 dark:bg-slate-950/20 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`relative px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-[18px] ${
                  activeTab === tab.key
                    ? "text-white dark:text-slate-900"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {activeTab === tab.key && (
                  <m.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 z-0 bg-slate-900 dark:bg-white rounded-[18px] shadow-lg shadow-slate-900/20 dark:shadow-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <m.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 rounded-3xl bg-slate-100/50 dark:bg-slate-800/20 animate-pulse" />
                ))}
              </m.div>
            ) : bestSellers.length > 0 ? (
              isMobile ? (
                <MobileProductSwiper 
                  items={bestSellers}
                  canLoop={bestSellers.length > 3}
                  paginationClass={paginationClass}
                  onSwiper={() => {}} 
                />
              ) : (
                <m.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4"
                >
                  {bestSellers.map((product: ProductType) => (
                    <div key={product.id} className="group">
                      <Product item={product} />
                    </div>
                  ))}
                </m.div>
              )
            ) : (
              <m.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-3xl mb-4">
                  🔍
                </div>
                <h3 className="text-xl font-bold mb-2">{t("shop.noProducts")}</h3>
                <p className="text-slate-500 max-w-sm">{t("shop.emptyCopy")}</p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
