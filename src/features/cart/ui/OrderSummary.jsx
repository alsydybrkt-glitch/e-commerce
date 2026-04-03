import { Link } from "react-router-dom";
import { formatCurrency } from "../lib/formatCurrency";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function OrderSummary({
  discount,
  promoCode,
  promoInputId,
  subtotal,
  total,
  onApplyPromoCode,
  onClearCart,
  onPromoCodeChange,
}) {
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onApplyPromoCode();
  };

  return (
    <aside
      className="surface-card h-fit p-6"
      aria-labelledby="order-summary-title"
    >
      <h2
        id="order-summary-title"
        className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100"
      >
        {t("cart.orderSummary")}
      </h2>

      <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between">
          <span>{t("common.subtotal")}</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t("common.discount")}</span>
          <span>{discount}%</span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold text-slate-900 dark:text-slate-100">
          <span>{t("common.total")}</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <label htmlFor={promoInputId} className="sr-only">
          {t("common.promoCode")}
        </label>
        <input
          id={promoInputId}
          type="text"
          placeholder={t("common.promoCode")}
          value={promoCode}
          onChange={(event) => onPromoCodeChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-700"
        />
        <button type="submit" className="primary-btn w-full">
          {t("common.applyPromo")}
        </button>
        <button
          type="button"
          className="secondary-btn w-full"
          onClick={onClearCart}
        >
          {t("common.resetCart")}
        </button>
      </form>

      <Link
        to="/checkout"
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-brand-500 dark:hover:bg-brand-400"
      >
        {t("cart.checkout")}
      </Link>
    </aside>
  );
}

export default OrderSummary;
