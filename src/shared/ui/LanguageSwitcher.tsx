"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";

function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const { toggleLocale, t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-surface-primary)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] shadow-sm transition hover:border-[var(--color-brand-600)] hover:text-[var(--color-brand-600)] hover:shadow-md min-w-[90px] text-center"
    >
      {mounted ? t("common.language") : "..."}
    </button>
  );
}

export default LanguageSwitcher;
