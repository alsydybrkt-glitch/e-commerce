"use client";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface BreadcrumbsProps {
  category: string;
  productTitle: string;
}

export function ProductBreadcrumbs({ category, productTitle }: BreadcrumbsProps) {
  const { t, tCategoryName } = useTranslation();

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 overflow-hidden text-xs sm:mb-6 sm:text-sm"
    >
      <Link 
        href="/" 
        className="shrink-0 text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
      >
        {t("nav.home")}
      </Link>
      
      <FaChevronRight className="shrink-0 text-[10px] text-slate-300" />
      
      <Link 
        href={`/category/${category}`} 
        className="max-w-[45vw] truncate capitalize text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 sm:max-w-none"
      >
        {tCategoryName(category)}
      </Link>
      
      <FaChevronRight className="shrink-0 text-[10px] text-slate-300" />
      
      <span
        className="max-w-full truncate font-medium text-slate-900 dark:text-slate-100"
        aria-current="page"
      >
        {productTitle}
      </span>
    </nav>
  );
}
