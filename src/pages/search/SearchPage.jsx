import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsBySearch } from "../../app/store/slices/productsSlice";
import Product from "../../features/catalog/slide-product/product";
import PageTransitions from "../../shared/ui/PageTransition";
import { useTranslation } from "../../shared/i18n/useTranslation";

function SearchPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.searchResults);
  const query = useMemo(
    () => new URLSearchParams(location.search).get("query") ?? "",
    [location.search]
  );

  useEffect(() => {
    if (query) {
      dispatch(fetchProductsBySearch(query));
    }
  }, [dispatch, query]);

  return (
    <PageTransitions key={query}>
      <section className="shell section-gap">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">{t("search.kicker")}</span>
            <h1 className="section-title">{t("search.title", { query })}</h1>
          </div>
          <p className="section-copy max-w-2xl">{t("search.copy")}</p>
        </div>

        {products?.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <Product key={product.id} item={product} />
            ))}
          </div>
        ) : (
          <div className="surface-card p-10 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
              {t("search.emptyTitle")}
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {t("search.emptyCopy")}
            </p>
          </div>
        )}
      </section>
    </PageTransitions>
  );
}

export default SearchPage;
