"use client";
import { memo, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaShare, FaStar } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart, MdOutlineDone } from "react-icons/md";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Interactive } from "@/shared/ui/Interactive";
import {
  add,
  makeSelectCartItemQuantity,
} from "@/features/cart/store/cartSlice";
import {
  addFavorite,
  makeSelectIsFavorite,
  removeFavorite,
} from "@/features/favorites/store/favoriteSlice";
import { shareProduct } from "@/features/products/utils/product-tools";
import {
  buildProductSharePayload,
  getProductImage,
} from "@/features/products/utils/product-helpers";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { Product as ProductType } from "@/features/products/services/productsApi";

function Product({ item }: { item: ProductType }) {
  const { t, tCategoryName } = useTranslation();
  const dispatch = useDispatch();
  
  // Memoized selectors for specific item to prevent unnecessary re-renders
  const cartQuantity = useSelector((state: any) => state.cart.quantityById?.[item.id] ?? 0);
  const isFavorite = useSelector((state: any) => Boolean(state.favorites.ids?.[item.id]));

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isInCart = isMounted && cartQuantity > 0;
  const image = getProductImage(item);
  const favoriteVisible = isMounted ? isFavorite : false;

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(add({ ...item, quantity: 1 }));
    toast.success(
      <div className="flex items-center gap-3">
        <div className="space-y-1">
          <p className="font-semibold text-text-primary">{item.title}</p>
          <p className="text-xs text-text-secondary">
            {isInCart ? t("product.quantityUpdated") : t("product.addedToCart")}
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
  };

  const handleToggleFavorite = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
      return;
    }
    dispatch(addFavorite(item));
    toast.success(t("product.addedToFavorites"));
  };

  const handleShare = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await shareProduct(
        buildProductSharePayload(
          item,
          `${window.location.origin}/product/${item.id}`,
        ),
      );
      toast.success(
        result === "shared"
          ? t("product.sharedSuccess")
          : t("product.linkCopied"),
      );
    } catch {
      toast.error(t("product.shareError"));
    }
  };

  return (
    <Interactive 
      variant="scale"
      className="product-card group relative flex h-full flex-col rounded-2xl border border-transparent bg-surface-primary p-4 transition-all hover:border-border-light hover:shadow-xl dark:bg-slate-900/40 dark:hover:border-slate-800 dark:hover:bg-slate-900/60"
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

        <div className="flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? t("product.removeFromFavorites") : t("product.addToFavorites")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-primary text-text-secondary transition-all hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-rose-950/20 active:scale-90"
          >
            {favoriteVisible ? <FaHeart className="text-rose-500" /> : <IoHeartOutline />}
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label={t("product.share")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-primary text-text-secondary transition-all hover:bg-bg-secondary hover:text-text-primary dark:border-slate-800 dark:bg-slate-900 active:scale-90"
          >
            <FaShare className="text-xs" />
          </button>
        </div>
      </div>

      <Link href={`/product/${item.id}`} className="block flex-1 group/image">
        <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-bg-secondary/50 dark:bg-slate-950/30">
          <Image
            key={item.id}
            src={image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 30vw, 300px"
            className="object-contain p-4 transition duration-700 group-hover/image:scale-110"
            loading="lazy"
          />
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
        className={`mt-6 btn w-full h-12 rounded-xl transition-all active:scale-[0.96] flex items-center justify-center gap-2 ${
          isInCart
            ? "btn-secondary"
            : "btn-primary shadow-sm"
        }`}
      >
        <MdOutlineAddShoppingCart className="text-lg" />
        {isInCart ? t("product.addOneMore") : t("product.addToCart")}
      </button>
    </Interactive>
  );
}


export default memo(Product);
