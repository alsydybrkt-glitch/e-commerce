"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "@/shared/i18n/useTranslation";

function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const { toggleLocale, t } = useTranslation();

  if (!mounted) return <div className="h-9 w-24 border border-transparent"></div>;

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-surface-primary)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] shadow-sm transition hover:border-[var(--color-brand-600)] hover:text-[var(--color-brand-600)] hover:shadow-md"
    >
      {t("common.language")}
    </button>
  );
}

export default LanguageSwitcher;
