import { useTranslation } from "../i18n/useTranslation";

function LanguageSwitcher() {
  const { toggleLocale, t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
    >
      {t("common.language")}
    </button>
  );
}

export default LanguageSwitcher;
