import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageTransitions from "../../shared/ui/PageTransition";
import { useTranslation } from "../../shared/i18n/useTranslation";
import {
  selectCartItems,
  selectCartSubtotal,
  selectFinalTotal,
  selectCartCount,
  resetCart,
} from "../../app/store/slices/cartSlice";

function CheckoutPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const finalTotal = useSelector(selectFinalTotal);
  const totalCount = useSelector(selectCartCount);

  const [shippingInfo, setShippingInfo] = useState(() => {
    try {
      const stored = localStorage.getItem("checkout_shipping_info");
      return stored
        ? JSON.parse(stored)
        : {
            fullName: "",
            address: "",
            city: "",
            country: "",
            phone: "",
            email: "",
          };
    } catch {
      return {
        fullName: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: "",
      };
    }
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "checkout_shipping_info",
      JSON.stringify(shippingInfo)
    );
  }, [shippingInfo]);

  const shippingCost = useMemo(() => (subtotal > 0 ? 12 : 0), [subtotal]);
  const taxAmount = useMemo(() => subtotal * 0.08, [subtotal]);

  const totalWithExtras = useMemo(
    () => finalTotal + shippingCost + taxAmount,
    [finalTotal, shippingCost, taxAmount]
  );

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setOrderPlaced(true);
    dispatch(resetCart());
  };

  /* ========= DESIGN SYSTEM INPUT ========= */

  const inputClass =
    "w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-brand-400 focus:ring-2 focus:ring-brand-300 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

  const paymentOptions = [
    { value: "card", label: t("checkout.paymentCard") },
    { value: "paypal", label: "PayPal" },
    { value: "cod", label: t("checkout.paymentCOD") },
  ];

  return (
    <PageTransitions>
      <section className="shell section-gap">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="section-title">{t("checkout.title")}</h1>
          <p className="section-copy max-w-3xl">
            {t("checkout.description")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">

          {/* FORM */}

          <form
            className="surface-card p-6 shadow-card transition dark:bg-slate-800/80"
            onSubmit={handleSubmit}
          >

            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {t("checkout.shippingInfo")}
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
                placeholder={t("checkout.fieldFullName")}
                required
                className={inputClass}
              />

              <input
                name="email"
                type="email"
                value={shippingInfo.email}
                onChange={handleShippingChange}
                placeholder={t("checkout.fieldEmail")}
                required
                className={inputClass}
              />

              <input
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingChange}
                placeholder={t("checkout.fieldPhone")}
                required
                className={inputClass}
              />

              <input
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                placeholder={t("checkout.fieldCountry")}
                required
                className={inputClass}
              />

              <input
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                placeholder={t("checkout.fieldCity")}
                required
                className={inputClass}
              />

              <input
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                placeholder={t("checkout.fieldAddress")}
                required
                className={`${inputClass} col-span-full`}
              />

            </div>

            {/* PAYMENT */}

            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {t("checkout.paymentMethodTitle")}
              </h2>

              <div className="flex flex-col gap-3">

                {paymentOptions.map((option) => (
                  <label
                    key={option.value}
                    className="rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={() => setPaymentMethod(option.value)}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}

              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="mt-6 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-brand-500 dark:hover:bg-brand-400"
            >
              {t("checkout.placeOrder")}
            </button>

            {/* SUCCESS */}

            {orderPlaced && (
              <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-400/40 dark:bg-emerald-950/40 dark:text-emerald-200">
                {t("checkout.successMessage")}
              </p>
            )}

          </form>

          {/* ORDER SUMMARY */}

          <aside className="surface-card p-6 shadow-card dark:bg-slate-900/70">

            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {t("checkout.orderSummary")}
            </h2>

            {cartItems.length === 0 ? (

              <div className="space-y-3">

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("checkout.emptyCart")}
                </p>

                <Link
                  to="/shop"
                  className="inline-block rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-100 dark:border-brand-400/40 dark:bg-brand-900/40 dark:text-brand-300"
                >
                  {t("checkout.gotoShop")}
                </Link>

              </div>

            ) : (

              <div className="space-y-4">

                {cartItems.map((item) => (

                  <div key={item.id} className="flex justify-between">

                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      {item.title || item.name} × {item.quantity}
                    </span>

                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                  </div>

                ))}

                <div className="border-t border-slate-200 pt-3 dark:border-slate-700">

                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{t("checkout.itemsCount")}</span>
                    <span>{totalCount}</span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{t("common.subtotal")}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{t("checkout.shippingCost")}</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{t("checkout.taxRate", { rate: 8 })}</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="mt-3 flex justify-between text-base font-bold text-slate-900 dark:text-slate-100">
                    <span>{t("common.total")}</span>
                    <span>${totalWithExtras.toFixed(2)}</span>
                  </div>

                </div>

              </div>

            )}

          </aside>

        </div>
      </section>
    </PageTransitions>
  );
}

export default CheckoutPage;