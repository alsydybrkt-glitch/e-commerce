"use client";

import { useState, useEffect } from "react";
import { useCartPage } from "../hooks/useCartPage";
import CartItemsList from "./CartItemsList";
import EmptyCartState from "./EmptyCartState";
import OrderSummary from "./OrderSummary";
import CartSkeleton from "@/shared/ui/skeletons/CartSkeleton";
import { useTranslation } from "@/shared/i18n/useTranslation";

function CartPageContent() {
  const { t } = useTranslation();
  const {
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
  } = useCartPage();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CartSkeleton />;
  }

  if (!items.length) {
    return <EmptyCartState />;
  }

  return (
    <>
      <section className="cart-page shell section-gap">
        <div className="mb-8">
          <span className="section-kicker">{t("cart.checkoutPreview")}</span>
          <h1 className="section-title">{t("cart.title")}</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <CartItemsList
            items={items}
            onDecreaseQuantity={decreaseItemQuantity}
            onIncreaseQuantity={increaseItemQuantity}
            onRemove={removeItem}
          />

          <OrderSummary
            discount={discount}
            promoCode={promoCode}
            promoInputId={promoInputId}
            subtotal={subtotal}
            total={total}
            onApplyPromoCode={applyPromoCode}
            onClearCart={clearCart}
            onPromoCodeChange={setPromoCode}
          />
        </div>
      </section>
    </>
  );
}

export default CartPageContent;
