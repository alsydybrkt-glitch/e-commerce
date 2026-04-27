import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function BestSellersHeader() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
      <div className="max-w-xl">
        <span className="section-kicker !border-brand-500/20 !bg-brand-500/10 !text-brand-600 dark:!text-brand-400">
          {t("home.performancePicks")}
        </span>

        <h2 className="section-title mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          {t("home.performanceTitle")}
        </h2>
      </div>

      <button
        onClick={() => router.push("/shop")}
        className="btn btn-secondary group flex items-center gap-2 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-text-primary hover:text-bg-primary"
      >
        {t("common.viewAllProducts")}
        <m.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          aria-hidden="true"
        >
          <ArrowRight className="h-4 w-4" />
        </m.span>
      </button>
    </div>
  );
}
