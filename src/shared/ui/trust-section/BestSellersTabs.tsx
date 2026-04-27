import { m } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface Tab {
  key: string;
  label: string;
}

interface BestSellersTabsProps {
  activeTab: string;
  setActiveTab: (key: string) => void;
}

export function BestSellersTabs({ activeTab, setActiveTab }: BestSellersTabsProps) {
  const { t } = useTranslation();
  
  const tabs: Tab[] = [
    { key: "all", label: t("home.tabs.all") },
    { key: "best", label: t("home.tabs.best") },
    { key: "discount", label: t("home.tabs.discount") },
    { key: "top", label: t("home.tabs.top") },
    { key: "new", label: t("home.tabs.new") },
  ];

  return (
    <div className="mb-12 flex flex-wrap gap-2 sm:gap-3 p-1.5 rounded-xl bg-surface-secondary w-fit border border-border-light relative z-10">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`relative px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-lg ${
            activeTab === tab.key
              ? "text-bg-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          {activeTab === tab.key && (
            <m.div
              layoutId="activeTabGlow"
              className="absolute inset-0 z-0 bg-text-primary rounded-lg shadow-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}