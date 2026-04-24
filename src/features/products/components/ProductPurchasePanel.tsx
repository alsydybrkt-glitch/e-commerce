"use client";
import { useState, useCallback, useEffect, useRef, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
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
// RootState not needed explicitly here anymore
import { Interactive } from "@/shared/ui/Interactive";
import { m, AnimatePresence } from "framer-motion";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Lifecycle state for client-only features
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleFavorite = useCallback(
    (currentStatus: boolean) => {
      if (currentStatus) {
        dispatch(removeFavorite(product.id));
        toast.success(t("notifications.removedFromFavorites"));
      } else {
        dispatch(addFavorite(product));
        toast.success(t("notifications.addedToFavorites"));
      }
    },
    [dispatch, product, t]
  );

  const handleShare = useCallback(async () => {
    try {
      const result = await shareProduct(buildProductSharePayload(product, window.location.href));
      toast.success(result === "shared" ? t("notifications.shareSuccess") : t("notifications.linkCopied"));
    } catch {
      toast.error(t("notifications.error"));
    }
  }, [product, t]);

  return (
    <div className="mt-4 space-y-4 sm:mt-8 sm:space-y-6">
      <div
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
            <FavoriteAction
              productId={product.id}
              onToggle={toggleFavorite}
            />

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

      <InCartStatus productId={product.id} />
    </div>
  );
}

const FavoriteAction = memo(
  ({
    productId,
    onToggle,
  }: {
    productId: number;
    onToggle: (isFav: boolean) => void;
  }) => {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isFavorite = useAppSelector((state) =>
      selectIsFavorite(state, productId)
    );

    return (
      <Interactive>
        <button
          type="button"
          onClick={() => onToggle(isFavorite)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-lg transition hover:border-brand-500 hover:text-brand-600 sm:h-[56px] sm:w-[56px] sm:rounded-[24px] sm:text-xl dark:border-slate-700 dark:hover:border-brand-400"
          aria-label={t("common.favorite") || "Favorite"}
        >
          {mounted && isFavorite ? (
            <FaHeart className="text-rose-500" />
          ) : (
            <IoMdHeartEmpty className="text-slate-400" />
          )}
        </button>
      </Interactive>
    );
  }
);
FavoriteAction.displayName = "FavoriteAction";

const InCartStatus = memo(({ productId }: { productId: number }) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cartQuantity = useAppSelector((state) =>
    selectCartItemQuantity(state, productId)
  );
  const isInCart = cartQuantity > 0;

  if (!mounted || !isInCart) return null;

  return (
    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
      {t("product.details.alreadyInCart", { count: cartQuantity })}
    </p>
  );
});
InCartStatus.displayName = "InCartStatus";
