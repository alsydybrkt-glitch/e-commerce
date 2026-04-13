"use client";
import { memo } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "@/shared/i18n/useTranslation";

interface CategoryCardProps {
  subtitle: string;
  title: string;
  slug?: string;
  img?: string;
}

function CategoryCard({ subtitle, title, slug, img }: CategoryCardProps) {
  const { t, isRTL } = useTranslation();
  const categorySlug = slug ?? title.toLowerCase().replace(/\s+/g, "-");
  const hasImage = Boolean(img);

  return (
    <Link
      href={`/category/${categorySlug}`}
      className="group surface-card relative overflow-hidden p-6 transition-all duration-300 border border-slate-100 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-600"
    >
      <div className="relative flex h-full min-h-[300px] flex-col justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {subtitle}
          </p>
          <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
            {title}
          </h3>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
            {t("common.browseNow")}
            <FiArrowUpRight
              className={`transition-transform duration-300 ${
                isRTL
                  ? "group-hover:-translate-x-1 group-hover:-translate-y-1"
                  : "group-hover:translate-x-1 group-hover:-translate-y-1"
              }`}
            />
          </div>
        </div>

        <div className="relative h-44 w-full overflow-hidden rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
          {hasImage ? (
            <Image
              src={img!}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="mx-auto object-contain transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
              {t("common.imageLoading")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(CategoryCard);
