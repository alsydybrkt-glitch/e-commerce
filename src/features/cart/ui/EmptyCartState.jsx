import { useTranslation } from "../../../shared/i18n/useTranslation";

function EmptyCartState() {
  const { t } = useTranslation();

  return (
    <section className="shell section-gap">
      <div className="surface-card p-10 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900">
          {t("cart.emptyTitle")}
        </h1>
        <p className="mt-3 text-sm text-slate-500">{t("cart.emptyCopy")}</p>
      </div>
    </section>
  );
}

export default EmptyCartState;
