import CategoryCard from "./CategoryCard";
import { useTranslation } from "../../../shared/i18n/useTranslation";

export default function CategoriesGrid({ categories }) {
  const { t, isRTL } = useTranslation();

  return (
    <section className="shell section-gap">
      <div
        className="
        mb-8 overflow-hidden rounded-[32px]
        border border-slate-200/60
        bg-gradient-to-br from-white via-slate-50 to-brand-50/40
        p-6 shadow-sm sm:p-8
        dark:border-slate-700/80
        dark:from-slate-900
        dark:via-slate-900/95
        dark:to-emerald-950/50
        dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)]
        "
      >
        <div
          className={`flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div className="max-w-3xl">
            <span className="section-kicker">{t("home.categoriesKicker")}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {t("home.categoriesTitle")}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            {t("home.categoriesCopy")}
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((item, index) => (
          <CategoryCard
            key={item.slug ?? item.title ?? index}
            subtitle={item.subtitle}
            title={item.title}
            slug={item.slug}
            img={item.img}
          />
        ))}
      </div>
    </section>
  );
}
