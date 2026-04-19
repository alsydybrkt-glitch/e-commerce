"use client";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import Image from "next/image";
import { RiFlashlightLine } from "react-icons/ri";
import SearchBox from "./SearchBox";
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import HeaderIcons from "./HeaderIcons";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useCallback, useMemo } from "react";
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";

// ✅ Type محددة بدل any
interface HeaderLogic {
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TopHeaderProps {
  headerLogic: HeaderLogic;
  isScrolled?: boolean;
}

function TopHeader({ headerLogic, isScrolled = false }: TopHeaderProps) {
  const { t } = useTranslation();
  const { openMobile, setOpenMobile } = headerLogic;

  // ✅ useCallback لمنع إعادة الإنشاء في كل render
  const toggleMobileDrawer = useCallback(() => {
    setOpenMobile((prev) => !prev);
  }, [setOpenMobile]);

  // ✅ تجميع الـ dynamic classes في متغيرات واضحة مع تحسين الأداء
  const styles = useMemo(() => ({
    wrapper: isScrolled
      ? "py-1 lg:py-1"
      : "py-1.5 lg:py-3",
    wrapperBg: isScrolled
      ? "border-b border-border-light bg-surface-primary/95 dark:border-slate-800 dark:bg-slate-900/95 shadow-md"
      : "border-b border-transparent bg-transparent",
    shell: isScrolled ? "py-0 lg:py-0.5" : "py-1.5 lg:py-3",
    logoContainer: isScrolled
      ? "h-8 w-8 lg:h-9 lg:w-9"
      : "h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14",
    logoText: isScrolled
      ? "text-sm lg:text-base"
      : "text-base sm:text-xl lg:text-2xl",
  }), [isScrolled]);

  return (
    <div className={`transition-[padding,background-color,border-color,shadow] duration-300 ease-out will-change-[padding,background-color] ${styles.wrapperBg}`}>
      <div className={`shell flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-6 transition-[padding] duration-300 ease-out ${styles.shell}`}>

        {/* ── Row 1: Logo + Utilities ── */}
        <div className="flex items-center justify-between gap-3 w-full lg:w-auto">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 transition-opacity hover:opacity-80 sm:gap-3"
          >
            <div className={`flex items-center justify-center rounded-lg bg-bg-secondary border border-border-light dark:bg-slate-800 dark:border-slate-700 overflow-hidden transition-all duration-300 ease-out will-change-transform ${styles.logoContainer}`}>
              <Image
                src="/images/img/aura-logo.png"
                alt="Aura logo"
                width={48}
                height={48}
                priority
                className="object-contain transition-transform group-hover:scale-105 duration-300"
                style={{ width: "auto", height: "auto" }}
              />
            </div>

            <div className="flex flex-col">
              <span className={`font-black tracking-tight text-text-primary dark:text-slate-100 leading-tight uppercase transition-[font-size] duration-300 ease-out ${styles.logoText}`}>
                Aura
              </span>

              <span
                aria-hidden={isScrolled}
                className={`hidden sm:block overflow-hidden text-[6px] sm:text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 transition-[max-height,opacity,transform] duration-200 ease-out ${
                  isScrolled
                    ? "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
                    : "max-h-6 opacity-100 translate-y-0"
                }`}
              >
                {t("header.premiumCommerce")}
              </span>
            </div>
          </Link>

          {/* Fast Delivery Badge – Desktop only */}
          <div className="hidden rounded-md border border-border-light bg-bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 lg:flex lg:items-center lg:gap-2">
            <RiFlashlightLine className="text-sm" />
            {t("header.fastDelivery")}
          </div>

          {/* Mobile Utility Cluster – ThemeToggle + Icons + Hamburger */}
          <div className="flex items-center gap-1 lg:hidden" role="toolbar" aria-label="Mobile utilities">
            <ThemeToggle />
            <HeaderIcons />
            <button
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 active:scale-95 ${
                openMobile
                  ? "bg-brand-50 border-brand-100 text-brand-600 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400"
                  : "border-border bg-surface-primary text-text-secondary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              }`}
              onClick={toggleMobileDrawer}
              // ✅ aria محسّن
              aria-label={openMobile ? "Close menu" : "Open menu"}
              aria-expanded={openMobile}
              aria-controls="mobile-drawer"
              type="button"
            >
              {openMobile
                ? <MdClose className="text-xl" />
                : <TiThMenu className="text-lg" />
              }
            </button>
          </div>
        </div>

        {/* ── Row 2: Search + Desktop Controls ── */}
        <div className="flex w-full items-center gap-1.5 lg:w-auto lg:gap-6">

          {/* Search */}
          <div className="flex-1 lg:max-w-md">
            <SearchBox />
          </div>

          {/* Desktop: Theme + Lang + Icons */}
          {/* ✅ render مرة واحدة بس على الـ desktop */}
          <div className="hidden items-center gap-4 border-l border-border-light pl-4 dark:border-slate-800 lg:flex lg:gap-6 lg:pl-6">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <span className="h-6 w-px bg-border-light dark:bg-slate-800" aria-hidden="true" />
            <HeaderIcons />
          </div>

          {/* Mobile: Language Switcher فقط (ThemeToggle و HeaderIcons فوق) */}
          {/* ✅ مش بنكرر ThemeToggle أو HeaderIcons هنا */}
          <div className="shrink-0 lg:hidden">
            <LanguageSwitcher />
          </div>
        </div>

      </div>
    </div>
  );
}

export default TopHeader;
