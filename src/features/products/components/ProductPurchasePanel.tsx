"use client";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaShare } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useTranslation } from "@/shared/i18n/useTranslation";
import { QuantitySelector } from "@/shared/ui/QuantitySelector";
import { add, selectCartItemQuantity } from "@/features/cart/store/cartSlice";
import { addFavorite, removeFavorite, selectIsFavorite } from "@/features/favorites/store/favoriteSlice";
import { Product } from "@/features/products/services/productsApi";
import { buildProductSharePayload, getProductImage } from "@/features/products/utils/product-helpers";
import { shareProduct } from "@/features/products/utils/product-tools";
import { RootState } from "@/store";
import { Interactive } from "@/shared/ui/Interactive";
import { motion, AnimatePresence } from "framer-motion";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartQuantity = useSelector((state: RootState) => selectCartItemQuantity(state, product.id));
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, product.id));
  const isInCart = cartQuantity > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      const purchaseActions = document.getElementById("main-purchase-actions");
      if (purchaseActions) {
        const rect = purchaseActions.getBoundingClientRect();
        setShowSticky(rect.top < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = useCallback(() => {
    setIsAdding(true);
    dispatch(add({ ...product, quantity: selectedQuantity }));
    
   toast.success(
      <div className="flex items-center gap-3">
        <div className="space-y-1">
          <p className="font-semibold text-text-primary">{product.title}</p>
          <p className="text-xs text-text-secondary">
            {cartQuantity > 0 ? t("notifications.addedToCart") : t("notifications.addedToCart")}
          </p>
          <Link
            href="/carts"
            className="btn btn-primary !py-1 !px-3 !text-[10px] uppercase tracking-wider"
            onClick={() => toast.dismiss()}
          >
            {t("product.viewCart")}
          </Link>
        </div>
      </div>,
      { duration: 3000 },
    );

    setTimeout(() => setIsAdding(false), 800);
    setSelectedQuantity(1);
  }, [dispatch, product, selectedQuantity, t, router]);

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
      toast.success(t("notifications.removedFromFavorites"));
    } else {
      dispatch(addFavorite(product));
      toast.success(t("notifications.addedToFavorites"));
    }
  }, [dispatch, isFavorite, product, t]);

  const handleShare = useCallback(async () => {
    try {
      const result = await shareProduct(buildProductSharePayload(product, window.location.href));
      toast.success(result === "shared" ? t("notifications.shareSuccess") : t("notifications.linkCopied"));
    } catch {
      toast.error(t("notifications.error"));
    }
  }, [product, t]);

  return (
    <div className="mt-8 space-y-6">
      <div id="main-purchase-actions" className="flex flex-wrap items-center gap-4">
        <QuantitySelector 
          quantity={selectedQuantity} 
          stock={product.stock} 
          onChange={setSelectedQuantity}
        />

        <div className="flex flex-1 items-center gap-2">
          <Interactive className="flex-1">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex w-full items-center justify-center gap-3 rounded-[24px] py-4 text-sm font-bold transition-all duration-300
                ${isAdding 
                  ? "bg-emerald-500 text-white shadow-inner" 
                  : "bg-slate-900 text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
                }
              `}
            >
              <MdOutlineAddShoppingCart className={`text-xl ${isAdding ? "animate-bounce" : ""}`} />
              {isAdding ? t("notifications.addedToCart") : t("product.addToCart")}
            </button>
          </Interactive>

          <Interactive>
            <button 
              onClick={toggleFavorite}
              className="flex h-[56px] w-[56px] items-center justify-center rounded-[24px] border border-slate-200 text-xl transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-400"
              aria-label="Favorite"
            >
              {mounted && isFavorite ? <FaHeart className="text-rose-500" /> : <IoMdHeartEmpty className="text-slate-400" />}
            </button>
          </Interactive>

          <Interactive>
            <button 
               onClick={handleShare}
               className="flex h-[56px] w-[56px] items-center justify-center rounded-[24px] border border-slate-200 text-xl text-slate-400 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-400"
               aria-label="Share"
            >
              <FaShare className="text-lg" />
            </button>
          </Interactive>
        </div>
      </div>

      {mounted && isInCart && (
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
           {t("product.details.alreadyInCart", { count: cartQuantity })}
        </p>
      )}

      {/* Sticky Mobile Bar with Premium Animation */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white p-4 shadow-2xl lg:hidden dark:border-slate-800 dark:bg-slate-900/95"
          >
            <div className="shell flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("common.total")}</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">${product.price}</span>
              </div>
              
              <Interactive className="flex-1">
                <button 
                  onClick={handleAddToCart}
                  className="w-full rounded-2xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg transition"
                >
                  {t("product.addToCart")}
                </button>
              </Interactive>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
