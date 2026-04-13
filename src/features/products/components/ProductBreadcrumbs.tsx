"use client";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "@/shared/i18n/useTranslation";

interface BreadcrumbsProps {
  category: string;
  productTitle: string;
}

export function ProductBreadcrumbs({ category, productTitle }: BreadcrumbsProps) {
  const { t, tCategoryName } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 overflow-hidden text-sm whitespace-nowrap">
      <Link 
        href="/" 
        className="text-slate-500 hover:text-brand-600 transition dark:text-slate-400 dark:hover:text-brand-400"
      >
        {t("nav.home")}
      </Link>
      
      <FaChevronRight className="text-[10px] text-slate-300" />
      
      <Link 
        href={`/category/${category}`} 
        className="text-slate-500 hover:text-brand-600 transition capitalize dark:text-slate-400 dark:hover:text-brand-400"
      >
        {tCategoryName(category)}
      </Link>
      
      <FaChevronRight className="text-[10px] text-slate-300" />
      
      <span className="font-medium text-slate-900 truncate dark:text-slate-100" aria-current="page">
        {productTitle}
      </span>
    </nav>
  );
}
