"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaShare } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { QuantitySelector } from "@/shared/ui/QuantitySelector";
import { add, selectCartItemQuantity } from "@/features/cart/store/cartSlice";
import { addFavorite, removeFavorite, selectIsFavorite } from "@/features/favorites/store/favoriteSlice";
import { Product } from "@/services/api/productsApi";
import { buildProductSharePayload } from "@/shared/utils/product-helpers";
import { shareProduct } from "@/shared/utils/product-tools";
import { RootState } from "@/store";
import { Interactive } from "@/shared/ui/Interactive";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const purchaseActionsRef = useRef<HTMLDivElement | null>(null);

  const cartQuantity = useSelector((state: RootState) => selectCartItemQuantity(state, product.id));
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, product.id));
  const isInCart = cartQuantity > 0;
  const totalPrice = (product.price * selectedQuantity).toFixed(2);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const handleViewportChange = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    handleViewportChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleViewportChange);
    } else {
      mediaQuery.addListener(handleViewportChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleViewportChange);
      } else {
        mediaQuery.removeListener(handleViewportChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || !isMobileViewport) {
      setShowSticky(false);
      return;
    }

    const target = purchaseActionsRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [mounted, isMobileViewport]);

  const handleAddToCart = useCallback(() => {
    setIsAdding(true);
    dispatch(add({ ...product, quantity: selectedQuantity }));
    
   toast.success(
      <div className="flex items-center gap-3">
        <div className="space-y-1">
          <p className="font-semibold text-text-primary">{product.title}</p>
          <p className="text-xs text-text-secondary">
            {t("notifications.addedToCart")}
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
  }, [dispatch, product, selectedQuantity, t]);

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
    <div className="mt-4 space-y-4 pb-24 sm:mt-8 sm:space-y-6 lg:pb-0">
      <div
        ref={purchaseActionsRef}
        id="main-purchase-actions"
        className="flex flex-col gap-3 sm:gap-4"
      >
        <QuantitySelector 
          quantity={selectedQuantity} 
          stock={product.stock} 
          onChange={setSelectedQuantity}
        />

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <Interactive className="w-full sm:min-w-0 sm:flex-1">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex h-12 w-full items-center justify-center gap-3 rounded-2xl px-3 text-sm font-bold transition-all duration-300 sm:h-[56px] sm:rounded-[24px]
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

          <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:shrink-0 sm:justify-start">
            <Interactive>
              <button 
                type="button"
                onClick={toggleFavorite}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-lg transition hover:border-brand-500 hover:text-brand-600 sm:h-[56px] sm:w-[56px] sm:rounded-[24px] sm:text-xl dark:border-slate-700 dark:hover:border-brand-400"
                aria-label={t("common.favorite") || "Favorite"}
              >
                {mounted && isFavorite ? <FaHeart className="text-rose-500" /> : <IoMdHeartEmpty className="text-slate-400" />}
              </button>
            </Interactive>

            <Interactive>
              <button 
                 type="button"
                 onClick={handleShare}
                 className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-lg text-slate-400 transition hover:border-brand-500 hover:text-brand-600 sm:h-[56px] sm:w-[56px] sm:rounded-[24px] sm:text-xl dark:border-slate-700 dark:hover:border-brand-400"
                 aria-label={t("common.share") || "Share"}
              >
                <FaShare className="text-lg" />
              </button>
            </Interactive>
          </div>
        </div>
      </div>

      {mounted && isInCart && (
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
           {t("product.details.alreadyInCart", { count: cartQuantity })}
        </p>
      )}

      {/* Sticky Mobile Bar with Premium Animation */}
      <AnimatePresence>
        {mounted && isMobileViewport && showSticky && (
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100/50 bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] lg:hidden dark:border-slate-800/50 dark:bg-slate-950/90"
          >
            <div className="shell flex items-center justify-between gap-4">
              <div className="min-w-0 flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("common.total")}</span>
                <span className="truncate text-lg font-bold text-slate-900 dark:text-white">${totalPrice}</span>
              </div>
              
              <Interactive className="flex-1">
                <button 
                  type="button"
                  onClick={handleAddToCart}
                  className="h-10 w-full rounded-2xl bg-brand-600 px-3 text-sm font-bold text-white shadow-lg transition sm:h-12"
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
