import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageTransitions from "../../shared/ui/PageTransition";
import { useTranslation } from "../../shared/i18n/useTranslation";

const trackingSteps = [
  "orderTracking.orderPlaced",
  "orderTracking.processing",
  "orderTracking.shipped",
  "orderTracking.outForDelivery",
  "orderTracking.delivered",
];

function OrderTrackingPage() {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const initialStep = useMemo(() => {
    if (!orderId) return 1;
    const step = Math.min(
      Math.max(1, orderId.length % trackingSteps.length || 1),
      trackingSteps.length,
    );
    return step;
  }, [orderId]);

  const [activeStep, setActiveStep] = useState(initialStep);
  const [copied, setCopied] = useState(false);

  const [trackingNumber] = useState(() => {
    if (orderId) return `TRK-${orderId.toUpperCase()}`;
    return `TRK-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  });

  const [orderNumber] = useState(() => {
    if (orderId) return `#${orderId.toUpperCase()}`;
    return `#${Math.floor(100000 + Math.random() * 900000)}`;
  });

  const orderDate = useMemo(() => {
    const base = new Date();
    base.setDate(base.getDate() - 3);
    return base;
  }, []);

  const estimatedDelivery = useMemo(() => {
    const eta = new Date(orderDate);
    eta.setDate(eta.getDate() + 5);
    return eta;
  }, [orderDate]);

  const courierLocation = useMemo(() => ({ lat: 30.0444, lng: 31.2357 }), []); // Cairo sample

  const progressPercentage = useMemo(() => {
    return ((activeStep - 1) / (trackingSteps.length - 1)) * 100;
  }, [activeStep]);

  const copyTrackingNumber = async () => {
    if (navigator.clipboard && trackingNumber) {
      await navigator.clipboard.writeText(trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${courierLocation.lat},${courierLocation.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const activeLabel = useMemo(
    () => t(trackingSteps[activeStep - 1]),
    [activeStep, t],
  );

  return (
    <PageTransitions>
      <section className="shell section-gap">
        <div className="mb-8">
          <span className="section-kicker">{t("orderTracking.kicker")}</span>
          <h1 className="section-title">{t("orderTracking.title")}</h1>
          <p className="section-copy max-w-3xl">
            {t("orderTracking.description")}
          </p>
        </div>

        <div className="surface-card p-6 shadow-card dark:bg-slate-800/80 dark:border-slate-700">
          <div className="grid gap-4 md:grid-cols-3 mb-5">
            <div className="rounded-xl bg-white border border-slate-200 p-4 text-slate-800 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("orderTracking.orderNumber")}
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {orderNumber}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4 text-slate-800 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("orderTracking.orderDate")}
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {orderDate.toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4 text-slate-800 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("orderTracking.estimatedDelivery")}
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {estimatedDelivery.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t("orderTracking.currentStatus")}:{" "}
                  <strong className="text-slate-900 dark:text-slate-100">
                    {activeLabel}
                  </strong>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("orderTracking.trackingNumber")}: {trackingNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="secondary-btn text-xs"
                  onClick={copyTrackingNumber}
                >
                  {copied
                    ? t("orderTracking.copied")
                    : t("orderTracking.copyTracking")}
                </button>
                <button
                  type="button"
                  className="secondary-btn text-xs"
                  onClick={openMap}
                >
                  {t("orderTracking.openMap")}
                </button>
              </div>
            </div>

            <div
              className="mt-4"
              aria-label={t("orderTracking.progressBarAria", {
                status: activeLabel,
              })}
            >
              <div
                className="h-2 rounded-full bg-slate-200 dark:bg-slate-700"
                aria-hidden="true"
              >
                <div
                  className="h-2 rounded-full bg-brand-600 dark:bg-brand-400"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                {trackingSteps.map((step, index) => {
                  return (
                    <span
                      key={step}
                      className={
                        index + 1 <= activeStep
                          ? "text-brand-600 dark:text-brand-400"
                          : ""
                      }
                    >
                      {t(step)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="secondary-btn"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}
            >
              {t("orderTracking.prev")}
            </button>
            <button
              type="button"
              className="primary-btn"
              disabled={activeStep === trackingSteps.length}
              onClick={() =>
                setActiveStep((prev) =>
                  Math.min(prev + 1, trackingSteps.length),
                )
              }
            >
              {t("orderTracking.next")}
            </button>
            <Link to="/order-tracking" className="secondary-btn">
              {t("orderTracking.trackAnother")}
            </Link>
          </div>
        </div>
      </section>
    </PageTransitions>
  );
}

export default OrderTrackingPage;
