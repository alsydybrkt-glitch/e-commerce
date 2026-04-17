"use client";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import Image from "next/image";
import { RiFlashlightLine } from "react-icons/ri";
import SearchBox from "./SearchBox";
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import HeaderIcons from "./HeaderIcons";
import { useTranslation } from "@/shared/hooks/useTranslation";

import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";

interface TopHeaderProps {
  headerLogic: any;
}

function TopHeader({ headerLogic }: TopHeaderProps) {
  const { t } = useTranslation();
  const { openMobile, setOpenMobile } = headerLogic;

  const toggleMobileDrawer = () => {
    setOpenMobile((prev: boolean) => !prev);
  };

  return (
    <div className="border-b border-border-light bg-surface-primary dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="shell flex flex-col gap-1.5 py-1.5 md:flex-row md:items-center md:justify-between md:gap-6 lg:py-4">
        {/* Row 1: Logo and Utilities */}
        <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
          <Link href="/" className="group flex items-center gap-1.5 transition-all hover:opacity-90 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-lg bg-bg-secondary border border-border-light dark:bg-slate-800 dark:border-slate-700 overflow-hidden transition-all">
              <Image
                src="/images/img/aura-logo.png"
                alt="Aura-Market"
                width={24}
                height={24}
                priority
                className="object-contain transition-transform group-hover:scale-110 duration-500 sm:w-9 sm:h-9"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-text-primary dark:text-slate-100 leading-tight uppercase">
                Aura-Market
              </span>
              <span className="hidden sm:block text-[6px] sm:text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
                {t("header.premiumCommerce")}
              </span>
            </div>
          </Link>
          
          <div className="hidden rounded-md border border-border-light bg-bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 lg:flex lg:items-center lg:gap-2">
            <RiFlashlightLine className="text-sm" />
            {t("header.fastDelivery")}
          </div>

          {/* Mobile Right Utility Cluster */}
          <div className="flex items-center gap-1 lg:hidden">
             <ThemeToggle />
             <HeaderIcons />
             <button
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 active:scale-95 ${
                  openMobile 
                    ? "bg-brand-50 border-brand-100 text-brand-600 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400" 
                    : "border-border bg-surface-primary text-text-secondary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                }`}
                onClick={toggleMobileDrawer}
                aria-label="Toggle menu"
                type="button"
              >
                {openMobile ? <MdClose className="text-xl" /> : <TiThMenu className="text-lg" />}
              </button>
          </div>
        </div>

        {/* Row 2: Search and Lang Switcher */}
        <div className="flex w-full items-center gap-1.5 lg:w-auto lg:gap-6">
          <div className="flex-1 lg:max-w-md">
            <SearchBox />
          </div>
          <div className="hidden items-center gap-4 border-l border-border-light pl-4 dark:border-slate-800 lg:flex lg:gap-6 lg:pl-6">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <span className="h-6 w-px bg-border-light dark:bg-slate-800" />
            <HeaderIcons />
          </div>
          {/* Mobile Language Switcher (visible next to search) */}
          <div className="shrink-0 lg:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
