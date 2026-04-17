"use client";

import { memo } from "react";
import CategoryCard from "./CategoryCard";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface CategoryData {
  subtitle: string;
  title: string;
  slug?: string;
  img?: string;
}

function CategoriesGrid({ categories }: { categories: CategoryData[] }) {
  const { t } = useTranslation();

  return (
    <section className="shell section-gap">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between border-b border-slate-100 pb-8 dark:border-slate-800">
        <div className="max-w-3xl">
          <span className="section-kicker">{t("home.categoriesKicker")}</span>
          <h2 className="section-title mt-2">{t("home.categoriesTitle")}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          {t("home.categoriesCopy")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((item: CategoryData, index: number) => (
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

export default memo(CategoriesGrid);
