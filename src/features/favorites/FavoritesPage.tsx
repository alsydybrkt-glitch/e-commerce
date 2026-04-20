"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { Product as ProductType } from "@/services/api/productsApi";
import { clearFavorites } from "@/features/favorites/store/favoriteSlice";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import Product from "@/features/products/slide-product/ProductCard";
import { Interactive } from "@/shared/ui/Interactive";
import { useRouter } from "next/navigation";

import FavoritesSkeleton from "@/shared/ui/skeletons/FavoritesSkeleton";

function Favorites() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const favorites = useAppSelector((state) => state.favorites.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <FavoritesSkeleton />;

  if (!favorites?.length) {
    return (
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="shell section-gap"
      >
        <div className="surface-card p-12 text-center rounded-[32px] shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <h2 className="font-display text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            {t("favorites.emptyTitle")}
          </h2>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {t("favorites.emptyCopy")}
          </p>
          <Interactive className="mt-8">
            <button
              onClick={() => router.push("/shop")}
              className="primary-btn px-10 py-4 font-bold"
            >
              {t("checkout.gotoShop") || "Explore Shop"}
            </button>
          </Interactive>
        </div>
      </motion.section>
    );
  }

  return (
    <>
      <section className="shell section-gap">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="section-kicker text-brand-600 dark:text-brand-400">{t("favorites.kicker")}</span>
            <h1 className="section-title text-4xl font-black">{t("favorites.title")}</h1>
          </div>
          <Interactive>
            <button
              className="px-6 py-3 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm transition-all hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400"
              onClick={() => dispatch(clearFavorites())}
            >
              {t("favorites.clear")}
            </button>
          </Interactive>
        </motion.div>

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <AnimatePresence mode="popLayout">
              {favorites.map((item: ProductType, index: number) => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <Product item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

export default Favorites;
