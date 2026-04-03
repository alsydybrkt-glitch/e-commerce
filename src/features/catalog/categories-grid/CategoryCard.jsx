import { memo } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function CategoryCard({ subtitle, title, slug, img }) {
  const { t, isRTL } = useTranslation();
  const categorySlug = slug ?? title.toLowerCase().replace(/\s+/g, "-");
  const hasImage = Boolean(img);

  return (
    <Link
      to={`/category/${categorySlug}`}
      className="group surface-card relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 sm:p-7 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-50/70 to-transparent dark:from-brand-950/50 dark:via-brand-900/15 dark:to-transparent" />
      <div
        className={`absolute top-0 h-36 w-36 rounded-full bg-brand-100/70 blur-3xl transition duration-500 group-hover:scale-125 dark:bg-brand-700/20 ${
          isRTL ? "left-0" : "right-0"
        }`}
      />
      <div className="relative flex h-full min-h-[24rem] flex-col justify-between gap-6">
        <div className="space-y-3">
          <p
            className={`text-xs font-semibold text-slate-400 dark:text-slate-500 ${
              isRTL ? "tracking-[0.12em]" : "tracking-[0.28em]"
            }`}
          >
            {subtitle}
          </p>
          <h3 className="min-h-[4rem] text-2xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            {title}
          </h3>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
            {t("common.browseNow")}
            <FiArrowUpRight
              className={`transition ${
                isRTL
                  ? "group-hover:-translate-x-1 group-hover:-translate-y-1"
                  : "group-hover:translate-x-1 group-hover:-translate-y-1"
              }`}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 p-4 dark:border-slate-600/70 dark:bg-slate-800/40 dark:ring-1 dark:ring-inset dark:ring-white/5">
          {hasImage ? (
            <img
              src={img}
              alt={title}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 90vw"
              className="mx-auto h-52 w-full object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-52 items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-500">
              {t("common.imageLoading")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(CategoryCard);
