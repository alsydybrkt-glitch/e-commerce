import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../slide-product/product";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function BestSellers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items = {}, homeStatus } = useSelector((state) => state.products);
  const [activeTab, setActiveTab] = useState("all");

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
        <div className="surface-card animate-pulse p-10">
          <div className="h-8 w-48 rounded-full bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <section className="shell section-gap">
      <div className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-kicker">{t("home.performancePicks")}</span>
            <h2 className="section-title">{t("home.performanceTitle")}</h2>
          </div>
          <button className="secondary-btn" onClick={() => navigate("/shop")}>
            {t("common.viewAllProducts")}
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bestSellers.map((product) => (
            <div key={product.id}>
              <Product item={product} hideImage />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
