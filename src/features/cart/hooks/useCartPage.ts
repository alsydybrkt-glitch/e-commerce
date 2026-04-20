import { useCallback, useId, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  applyDiscount,
  decreaseQty,
  increaseQty,
  remove,
  resetCart,
  selectCartDiscount,
  selectCartItems,
  selectCartSubtotal,
  selectFinalTotal,
} from "@/features/cart/store/cartSlice";
import { getPromoDiscount } from "@/constants/promoCodes";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function useCartPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const promoInputId = useId();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectFinalTotal);
  const discount = useAppSelector(selectCartDiscount);
  const [promoCode, setPromoCode] = useState("");

  const applyPromoCode = useCallback(() => {
    const normalizedCode = promoCode.trim().toUpperCase();
    const promoDiscount = getPromoDiscount(normalizedCode);

    if (!promoDiscount) {
      toast.error(t("notifications.promoInvalid"));
      return;
    }

    dispatch(applyDiscount(promoDiscount));
    toast.success(t("notifications.promoSuccess", { code: normalizedCode }));
    setPromoCode("");
  }, [dispatch, promoCode, t]);

  const increaseItemQuantity = useCallback(
    (itemId: number) => {
      dispatch(increaseQty(itemId));
    },
    [dispatch]
  );

  const decreaseItemQuantity = useCallback(
    (itemId: number, quantity: number) => {
      if (quantity <= 1) {
        return;
      }

      dispatch(decreaseQty(itemId));
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (itemId: number) => {
      dispatch(remove(itemId));
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    if (typeof window !== "undefined" && window.confirm(t("cart.confirmReset"))) {
      dispatch(resetCart());
    }
  }, [dispatch, t]);

  return {
    discount,
    items,
    promoCode,
    promoInputId,
    subtotal,
    total,
    applyPromoCode,
    clearCart,
    decreaseItemQuantity,
    increaseItemQuantity,
    removeItem,
    setPromoCode,
  };
}
