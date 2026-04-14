import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { getTranslations } from "@/shared/i18n/get-translations";

type RawSearchParams = Record<string, string | string[] | undefined>;

interface ServerPaginationProps {
  pathname: string;
  currentPage: number;
  totalPages: number;
  searchParams?: RawSearchParams;
  locale: string;
}

function toSingleValue(
  value: string | string[] | undefined
): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return undefined;
}

function buildPageHref(
  pathname: string,
  searchParams: RawSearchParams,
  page: number
): string {
  const next = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    const single = toSingleValue(value);
    if (single) {
      next.set(key, single);
    }
  });

  if (page <= 1) {
    next.delete("page");
  } else {
    next.set("page", String(page));
  }

  const query = next.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export default function ServerPagination({
  pathname,
  currentPage,
  totalPages,
  searchParams = {},
  locale,
}: ServerPaginationProps) {
  const { t } = getTranslations(locale);

  if (totalPages <= 1) {
    return null;
  }

  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      aria-label={t("shop.pagination.ariaLabel") || "Pagination"}
      className="mt-10 flex items-center justify-center gap-3"
    >
      {currentPage > 1 ? (
        <Link
          href={buildPageHref(pathname, searchParams, previousPage)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
        >
          {t("shop.pagination.previous")}
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400 dark:border-slate-700 dark:text-slate-500">
          {t("shop.pagination.previous")}
        </span>
      )}

      <span className="text-sm text-slate-600 dark:text-slate-300">
        {t("shop.pagination.pageOf", { current: currentPage, total: totalPages })}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildPageHref(pathname, searchParams, nextPage)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
        >
          {t("shop.pagination.next")}
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400 dark:border-slate-700 dark:text-slate-500">
          {t("shop.pagination.next")}
        </span>
      )}
    </nav>
  );
}
