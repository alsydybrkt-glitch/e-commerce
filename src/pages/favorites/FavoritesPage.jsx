import { useSelector, useDispatch } from "react-redux";
import Product from "../../features/catalog/slide-product/product";
import PageTransitions from "../../shared/ui/PageTransition";
import { clearFavorites } from "../../app/store/slices/favoriteSlice";
import { useTranslation } from "../../shared/i18n/useTranslation";

function Favorites() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  if (!favorites?.length) {
    return (
      <section className="shell section-gap">
        <div className="surface-card p-10 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
            {t("favorites.emptyTitle")}
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {t("favorites.emptyCopy")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <PageTransitions key={favorites.length}>
      <section className="shell section-gap">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">{t("favorites.kicker")}</span>
            <h1 className="section-title">{t("favorites.title")}</h1>
          </div>
          <button
            className="secondary-btn w-fit"
            onClick={() => dispatch(clearFavorites())}
          >
            {t("favorites.clear")}
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {favorites.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </div>
      </section>
    </PageTransitions>
  );
}

export default Favorites;
