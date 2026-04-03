import { Link } from "react-router-dom";
import { RiFlashlightLine } from "react-icons/ri";
import SearchBox from "./SearchBox";
import LanguageSwitcher from "../../../shared/ui/LanguageSwitcher";
import ThemeToggle from "../../../shared/ui/ThemeToggle";
import { useTranslation } from "../../../shared/i18n/useTranslation";

function TopHeader() {
  const { t } = useTranslation();

  return (
    <div className="border-b border-slate-200/70 dark:border-slate-700/70">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-card dark:bg-slate-800 dark:ring-1 dark:ring-slate-700">
              <img
                src="/images/img/store-logo.png"
                alt="Al Saiedy"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                Al Saiedy
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                {t("header.premiumCommerce")}
              </p>
            </div>
          </Link>
          <div className="hidden rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-300 lg:flex lg:items-center lg:gap-2">
            <RiFlashlightLine className="text-sm" />
            {t("header.fastDelivery")}
          </div>
        </div>
        <div className="flex w-full items-center gap-3 lg:w-auto">
          <SearchBox />
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
