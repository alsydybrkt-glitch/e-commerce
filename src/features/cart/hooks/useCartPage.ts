import { useCallback, useId, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
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
import { getPromoDiscount } from "../lib/promoCodes";
import { useTranslation } from "@/shared/i18n/useTranslation";

export function useCartPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const promoInputId = useId();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const total = useSelector(selectFinalTotal);
  const discount = useSelector(selectCartDiscount);
  const [promoCode, setPromoCode] = useState("");

  const applyPromoCode = useCallback(() => {
    const normalizedCode = promoCode.trim().toUpperCase();
    const promoDiscount = getPromoDiscount(normalizedCode);

    if (!promoDiscount) {
      toast.error(t("cart.invalidPromo"));
      return;
    }

    dispatch(applyDiscount(promoDiscount));
    toast.success(t("cart.promoApplied", { code: normalizedCode }));
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
