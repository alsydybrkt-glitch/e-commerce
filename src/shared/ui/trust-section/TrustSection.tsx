"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProductsByCategory } from "@/features/products/store/productsSlice";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { m } from "framer-motion";
import Product from "@/features/products/slide-product/Product";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const MobileProductSwiper = dynamic(() => import("@/features/products/slide-product/MobileProductSwiper"), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-surface-interactive rounded-xl" />
});

export default function FeaturedCollection() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items = {}, homeStatus } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!items["smartphones"]?.length) {
      dispatch(fetchProductsByCategory("smartphones"));
    }
  }, [dispatch, items]);

  const smartphoneProducts = useMemo(() => {
    const all = items["smartphones"] || [];
    return Array.from(new Map(all.map(p => [p.id, p])).values());
  }, [items]);

  const spotlightProduct = smartphoneProducts[0];
  const gridProducts = smartphoneProducts.slice(1, 9);

  const isLoading = homeStatus === "loading" && smartphoneProducts.length === 0;

  if (!isLoading && smartphoneProducts.length === 0) return null;

  return (
    <section className="shell section-gap">
      {/* Main Container - Reduced padding and more balanced shadow */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-2xl bg-surface-secondary border border-border-light p-5 sm:p-8 lg:p-10 ">
        
        {/* Subtle Accents */}
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-brand-500/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          {/* Compact Header */}
          <div className="mb-8 flex items-end justify-between gap-4 px-1">
            <div>
              <m.span 
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="mb-2 inline-block rounded-full bg-brand-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400"
              >
                {t("home.featuredEdit")}
              </m.span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-text-primary">
                Elite Collection
              </h2>
            </div>
            
            <button 
              onClick={() => router.push("/shop?category=smartphones")}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-600 transition-all hover:text-brand-500"
            >
              {t("common.viewAllProducts")}
              <FiArrowRight className="text-base" />
            </button>
          </div>

          {isLoading ? (
            <div className="h-80 rounded-xl bg-surface-interactive animate-pulse" />
          ) : (
            <div className="flex flex-col gap-6">
              
              {/* Spotlight Hero Card - More compact height and better alignment */}
              <m.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col lg:flex-row overflow-hidden rounded-xl sm:rounded-2xl bg-surface-primary border border-border-light shadow-md transition-all duration-500 hover:border-brand-500/20"
              >
                {/* Text Content - Focused and tightly packed */}
                <div className="relative z-20 p-6 sm:p-10 lg:p-12 flex flex-col justify-center flex-1 lg:max-w-[45%]">
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary mb-3 leading-tight">
                      {spotlightProduct?.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed max-w-sm line-clamp-2">
                      {spotlightProduct?.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-3xl font-black text-text-primary">
                        ${spotlightProduct?.price}
                      </div>
                      {spotlightProduct?.discountPercentage > 0 && (
                        <div className="rounded-md bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-500">
                          -{Math.round(spotlightProduct.discountPercentage)}%
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push(`/product/${spotlightProduct?.id}`)}
                    className="btn btn-primary flex w-full sm:w-fit items-center justify-center gap-2 rounded-lg px-8 py-3 text-[11px] font-bold shadow-md shadow-brand-500/10 active:scale-95"
                  >
                    <FiShoppingBag className="text-base" />
                    Discover Model
                  </button>
                </div>

                <div className="relative h-48 sm:h-64 lg:h-auto lg:flex-1 bg-gradient-to-tr from-brand-500/5 to-transparent flex items-center justify-center p-6 lg:p-10">
                  <div className="relative h-full w-full">
                    <img 
                      src={spotlightProduct?.thumbnail || ""} 
                      alt={spotlightProduct?.title || ""}
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2 drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </div>
              </m.div>

              {/* Compact Slider for other products */}
              <div className="mt-2">
                <div className="mb-4 flex items-center justify-between px-1">
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider opacity-80">More Models</h4>
                </div>
                
                <div className="relative">
                  <MobileProductSwiper 
                    items={gridProducts}
                    canLoop={true}
                    paginationClass="pagination-elite"
                    onSwiper={() => {}}
                  />
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
}