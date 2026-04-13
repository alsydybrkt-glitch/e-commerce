"use client";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import Image from "next/image";
import { RiFlashlightLine } from "react-icons/ri";
import SearchBox from "./SearchBox";
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import HeaderIcons from "./HeaderIcons";
import { useTranslation } from "@/shared/i18n/useTranslation";

function TopHeader() {
  const { t } = useTranslation();

  return (
    <div className="border-b border-border-light bg-surface-primary dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:py-6 lg:gap-6">
        {/* Top Row: Logo and Mobile Utilities */}
        <div className="flex items-center justify-between gap-4 w-full lg:w-auto">
          <Link href="/" className="group flex items-center gap-3 transition-all hover:opacity-90">
            <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-lg bg-bg-secondary border border-border-light dark:bg-slate-800 dark:border-slate-700 overflow-hidden transition-all">
              <Image
                src="/images/img/aura-logo.png"
                alt="Aura-Market"
                width={36}
                height={36}
                priority
                className="object-contain transition-transform group-hover:scale-110 duration-500"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black tracking-tight text-text-primary dark:text-slate-100 leading-tight uppercase">
                Aura-Market
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400">
                {t("header.premiumCommerce")}
              </span>
            </div>
          </Link>
          
          <div className="hidden rounded-md border border-border-light bg-bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 lg:flex lg:items-center lg:gap-2">
            <RiFlashlightLine className="text-sm" />
            {t("header.fastDelivery")}
          </div>

          {/* Mobile Right Utility Cluster (Visible only on small screens) */}
          <div className="flex items-center gap-3 lg:hidden">
             <ThemeToggle />
             <HeaderIcons />
          </div>
        </div>

        {/* Bottom Row on Mobile / Main Row on Desktop: Search and Actions */}
        <div className="flex w-full items-center gap-4 lg:w-auto lg:gap-6">
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
          {/* Mobile Language Switcher */}
          <div className="lg:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
