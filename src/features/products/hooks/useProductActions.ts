"use client";
import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import toast from "react-hot-toast";
import { add } from "@/features/cart/store/cartSlice";
import {
  addFavorite,
  removeFavorite,
} from "@/features/favorites/store/favoriteSlice";
import { shareProduct } from "@/shared/utils/product-tools";
import { buildProductSharePayload } from "@/shared/utils/product-helpers";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function useProductActions(item: any) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const addToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(add({ ...item, quantity: 1 }));

    toast.success(t("notifications.addedToCart"));
  }, [dispatch, item, t]);

  const toggleFavorite = useCallback((isFav: boolean) => {
    if (isFav) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
      toast.success(t("notifications.addedToFavorites"));
    }
  }, [dispatch, item, t]);

  const share = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await shareProduct(
        buildProductSharePayload(
          item,
          `${window.location.origin}/product/${item.id}`
        )
      );
      toast.success(t("notifications.shareSuccess"));
    } catch {
      toast.error(t("notifications.error"));
    }
  }, [item, t]);

  return { addToCart, toggleFavorite, share };
}