"use client";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Category } from "@/services/api/productsApi";

interface DesktopMegaMenuProps {
  categories: Category[];
  isRTL: boolean;
  onClose: () => void;
  featuredLinks: { label: string; href: string }[];
}

export function DesktopMegaMenu({ categories, isRTL, onClose, featuredLinks }: DesktopMegaMenuProps) {
  const { t, tCategoryName, tCategoryDescription } = useTranslation();

  return (
    <div
      className={`absolute top-[calc(100%+12px)] z-20 w-[58rem] max-w-[calc(100vw-4rem)] overflow-hidden rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] ${
        isRTL ? "right-0" : "left-0"
      }`}
    >
      <div>
        <div
          className={`mb-5 flex items-end justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-700 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-slate-400 dark:text-slate-500">
              {t("common.categories")}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {isRTL ? "تصفح الأقسام بسرعة" : "Browse categories quickly"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {categories.length} {isRTL ? "أقسام" : "sections"}
            </span>
            {featuredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group rounded-[22px] border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              onClick={onClose}
            >
              <div
                className={`flex items-start gap-3 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  {tCategoryName(category.slug || category.name)
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {tCategoryName(category.slug || category.name)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    {t("common.exploreItems")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
