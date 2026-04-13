"use client";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Product from "@/features/products/slide-product/product";
import { useTranslation } from "@/shared/i18n/useTranslation";

function BestSellers() {
  const { t } = useTranslation();
  const router = useRouter();
  const { items = {}, homeStatus } = useSelector((state: any) => state.products);
  const [activeTab, setActiveTab ] = useState("all");

  const tabs = useMemo(
    () => [
      { key: "all", label: t("home.tabs.all") },
      { key: "best", label: t("home.tabs.best") },
      { key: "discount", label: t("home.tabs.discount") },
      { key: "top", label: t("home.tabs.top") },
      { key: "new", label: t("home.tabs.new") },
    ],
    [t]
  );

  const bestSellers = useMemo(() => {
    const allProducts = Object.values(items).filter(Array.isArray).flat();
    let filtered = [];

    switch (activeTab) {
      case "best":
        filtered = allProducts.filter((product) => product.rating >= 4.7);
        break;
      case "discount":
        filtered = allProducts.filter((product) => product.discountPercentage >= 15);
        break;
      case "top":
        filtered = [...allProducts].sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        filtered = [...allProducts].slice(-10);
        break;
      default:
        filtered = allProducts;
    }

    return filtered.slice(0, 6);
  }, [items, activeTab]);

  if (homeStatus === "loading") {
    return (
      <div className="shell pb-20">
        <div className="surface-card animate-pulse p-10 bg-bg-secondary border-border-light dark:bg-slate-900/50 dark:border-slate-800">
          <div className="h-6 w-48 rounded-md bg-bg-tertiary dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <section className="shell section-gap">
      <div className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10 bg-bg-secondary/50 border-border-light dark:bg-slate-900/10 dark:border-slate-800">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-kicker">{t("home.performancePicks")}</span>
            <h2 className="section-title mt-2">{t("home.performanceTitle")}</h2>
          </div>
          <button className="btn btn-secondary text-xs uppercase tracking-wider" onClick={() => router.push("/shop")}>
            {t("common.viewAllProducts")}
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-all duration-200 border ${
                activeTab === tab.key
                  ? "bg-text-primary text-text-inverse border-text-primary dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
                  : "bg-surface-primary text-text-secondary border-border hover:border-border-dark dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:border-slate-500"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bestSellers.map((product: any) => (
            <div key={product.id}>
              <Product item={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
