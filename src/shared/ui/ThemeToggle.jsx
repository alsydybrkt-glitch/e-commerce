import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../theme/useTheme";
import { useTranslation } from "../i18n/useTranslation";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { locale } = useTranslation();

  const label = isDark
    ? locale === "ar"
      ? "فاتح"
      : "Light"
    : locale === "ar"
      ? "داكن"
      : "Dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
      aria-label={label}
      title={label}
    >
      {isDark ? <MdLightMode className="text-base" /> : <MdDarkMode className="text-base" />}
      <span>{label}</span>
    </button>
  );
}

export default ThemeToggle;
