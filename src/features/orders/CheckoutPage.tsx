"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { resetCart, selectFinalTotal, selectCartSubtotal, selectCartCount } from "@/features/cart/store/cartSlice";
import { formatCurrency } from "@/features/cart/lib/formatCurrency";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Interactive } from "@/shared/ui/Interactive";
import { motion, AnimatePresence } from "framer-motion";

import CheckoutSkeleton from "@/shared/ui/skeletons/CheckoutSkeleton";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const finalTotal = useSelector(selectFinalTotal);
  const subtotal = useSelector(selectCartSubtotal);
  const itemCount = useSelector(selectCartCount);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API Payment Delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      dispatch(resetCart());
    }, 1500);
  };

  if (!mounted) return <CheckoutSkeleton />;

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center"
      >
        <FaCheckCircle className="text-6xl text-brand-500" />
        <h1 className="mt-6 font-display text-4xl font-bold text-slate-900 dark:text-white">
          {t("checkout.paymentSuccessful")}
        </h1>
        <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400">
          {t("checkout.paymentProcessed")}
        </p>
        <Interactive className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="primary-btn px-8 py-3 font-bold"
          >
            {t("checkout.returnHome")}
          </button>
        </Interactive>
      </motion.div>
    );
  }

  // Redirect to Home if cart is empty before success state
  if (itemCount === 0 && !isSuccess && !isProcessing) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("checkout.emptyCart")}</h2>
        <Interactive className="mt-6">
          <button onClick={() => router.push("/")} className="primary-btn font-bold">
            {t("checkout.gotoShop")}
          </button>
        </Interactive>
      </div>
    );
  }

  return (
    <div className="shell grid gap-10 py-10 lg:grid-cols-[1.5fr_1fr]">
      {/* Checkout Form */}
      <section>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
          {t("checkout.title")}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t("checkout.description")}
        </p>

        <form id="checkout-form" onSubmit={handleSubmit} className="mt-10 space-y-8">
          {/* Shipping Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2 dark:border-slate-800 dark:text-white">
              {t("checkout.shippingInfo")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="fullName"
                placeholder={t("checkout.fieldFullName")}
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
              <input
                type="email"
                name="email"
                placeholder={t("checkout.fieldEmail")}
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
              <input
                type="text"
                name="address"
                placeholder={t("checkout.fieldAddress")}
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none sm:col-span-2 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
               <input
                type="text"
                name="city"
                placeholder={t("checkout.fieldCity")}
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
              <input
                type="text"
                name="zipCode"
                placeholder={t("checkout.zipCode")}
                required
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2 dark:border-slate-800 dark:text-white flex items-center gap-2">
              <FaLock className="text-slate-400 text-sm" /> {t("checkout.paymentMethodTitle")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
               <input
                type="text"
                name="cardNumber"
                placeholder={t("checkout.cardNumber")}
                required
                maxLength={19}
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none sm:col-span-2 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
              <input
                type="text"
                name="expiry"
                placeholder={t("checkout.expiry")}
                required
                maxLength={5}
                value={formData.expiry}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
               <input
                type="text"
                name="cvc"
                placeholder={t("checkout.cvc")}
                required
                maxLength={4}
                value={formData.cvc}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
              />
            </div>
          </div>
        </form>
      </section>

      {/* Order Summary Widget */}
      <aside className="surface-card h-fit p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("checkout.orderSummary")}</h2>
        <div className="mt-6 flex justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{t("checkout.itemsCount")} ({itemCount}):</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="mt-4 flex justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{t("checkout.shippingCost")}:</span>
          <span>{t("checkout.shippingFree")}</span>
        </div>
        
        <div className="mt-6 border-t border-slate-200 pt-6 flex justify-between text-xl font-bold text-slate-900 dark:border-slate-700 dark:text-white">
          <span>{t("common.total")}:</span>
          <span>{formatCurrency(finalTotal)}</span>
        </div>

        <Interactive className="mt-8">
          <button
            form="checkout-form"
            type="submit"
            disabled={isProcessing}
            className="primary-btn flex w-full items-center justify-center py-4 font-bold"
          >
            {isProcessing ? (
               <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"></div>
            ) : (
              `${t("checkout.placeOrder")} (${formatCurrency(finalTotal)})`
            )}
          </button>
        </Interactive>
      </aside>
    </div>
  );
}
