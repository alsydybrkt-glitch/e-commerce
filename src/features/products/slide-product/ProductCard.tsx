"use client";
import { memo, useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart, FaShare, FaStar } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart, MdOutlineDone } from "react-icons/md";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Interactive } from "@/shared/ui/Interactive";
import { add } from "@/features/cart/store/cartSlice";
import {
  addFavorite,
  removeFavorite,
} from "@/features/favorites/store/favoriteSlice";
import { shareProduct } from "@/shared/utils/product-tools";
import {
  buildProductSharePayload,
  getProductImage,
} from "@/shared/utils/product-helpers";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product as ProductType } from "@/services/api/productsApi";
import SkeletonProduct from "./ProductSkeleton";

function Product({ item, priority = false }: { item: ProductType; priority?: boolean }) {
  const { t, tCategoryName } = useTranslation();
  const dispatch = useDispatch();

  // Redux state
  const cartQuantity = useSelector(
    (state: any) => state.cart.quantityById?.[item.id] ?? 0
  );
  const isFavoriteRedux = useSelector(
    (state: any) => Boolean(state.favorites.ids?.[item.id])
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration-safe derived states
  const isInCart = mounted ? cartQuantity > 0 : false;
  const isFavorite = mounted ? isFavoriteRedux : false;
  const image = useMemo(() => getProductImage(item), [item]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(add({ ...item, quantity: 1 }));
      toast.success(
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <p className="font-semibold text-text-primary">{item.title}</p>
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
        { duration: 3000 }
      );
    },
    [dispatch, item, t]
  );

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isFavorite) {
        dispatch(removeFavorite(item.id));
      } else {
        dispatch(addFavorite(item));
        toast.success(t("notifications.addedToFavorites"));
      }
    },
    [dispatch, item, isFavorite, t]
  );

  const handleShare = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const result = await shareProduct(
          buildProductSharePayload(
            item,
            `${window.location.origin}/product/${item.id}`
          )
        );
        toast.success(
          result === "shared"
            ? t("notifications.shareSuccess")
            : t("notifications.linkCopied")
        );
      } catch {
        toast.error(t("notifications.error"));
      }
    },
    [item, t]
  );

  return (
    <Interactive
      variant="scale"
      className="product-card group relative flex h-full flex-col rounded-[2.5rem] border border-slate-100 bg-white p-3.5 sm:p-4 transition-all duration-500 hover:border-brand-500/20 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:bg-slate-900/40 dark:border-slate-800/50 dark:hover:border-brand-400/30 dark:hover:bg-slate-900/80 hover:-translate-y-2"
    >
      <div className="mb-4 flex items-center justify-between">
        {isInCart ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700 dark:bg-brand-900/20 dark:text-brand-400">
            <MdOutlineDone className="text-xs" />
            {t("product.inCart", { count: cartQuantity })}
          </span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            {tCategoryName(item.category)}
          </span>
        )}

        <div className="flex gap-1.5 opacity-100 lg:opacity-0 transition-all duration-300 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 translate-x-1 lg:translate-x-4">
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite
                ? t("product.removeFromFavorites")
                : t("product.addToFavorites")
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-primary text-text-secondary shadow-sm transition-all duration-300 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-rose-950/20 active:scale-90"
          >
            {isFavorite ? (
              <FaHeart className="text-rose-500" />
            ) : (
              <IoHeartOutline className="text-lg" />
            )}
          </button>
          <button
            type="button"
            onClick={handleShare}
            suppressHydrationWarning
            aria-label={t("product.share")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-primary text-text-secondary shadow-sm transition-all duration-300 hover:bg-bg-secondary hover:text-text-primary dark:border-slate-800 dark:bg-slate-900 active:scale-90"
          >
            <FaShare className="text-xs" />
          </button>
        </div>
      </div>

      <Link href={`/product/${item.id}`} className="block flex-1 group/image">
        <div className="relative mb-3 aspect-square overflow-hidden rounded-[20px] bg-slate-50 dark:bg-slate-950/40 shadow-inner">
          <Image
            key={item.id}
            src={image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 30vw, 300px"
            priority={priority}
            className="object-contain p-4 transition-all duration-700 group-hover/image:scale-110 group-hover/image:rotate-2"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/10 to-transparent dark:from-black/10" />
        </div>

        <div className="space-y-2">
          <h3 className="line-clamp-2 text-sm font-semibold tracking-tight leading-snug text-slate-900 dark:text-white min-h-[2.5rem]">
            {item.title}
          </h3>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-[10px] text-amber-500">
                <FaStar />
                <span className="ms-1 font-bold text-slate-900 dark:text-white">
                  {item.rating || 4.8}
                </span>
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                120 {t("product.details.rating")}
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              ${item.price}
            </p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`mt-4 btn w-full h-11 rounded-xl transition-all active:scale-[0.96] flex items-center justify-center gap-2 ${
          isInCart ? "btn-secondary" : "btn-primary shadow-sm"
        }`}
      >
        <MdOutlineAddShoppingCart className="text-lg" />
        {isInCart ? t("product.addOneMore") : t("product.addToCart")}
      </button>
    </Interactive>
  );
}

export default memo(Product);
