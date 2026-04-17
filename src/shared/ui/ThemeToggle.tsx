"use client";
import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "@/shared/hooks/useTheme";
import { useTranslation } from "@/shared/hooks/useTranslation";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const { isDark, toggleTheme } = useTheme();
  const { locale } = useTranslation();

  if (!mounted) return <div className="h-9 w-24 border border-transparent"></div>;

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
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-surface-primary)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] shadow-sm transition hover:-translate-y-px hover:border-[var(--color-brand-600)] hover:text-[var(--color-brand-600)] hover:shadow-md"
      aria-label={label}
      title={label}
    >
      {isDark ? <MdLightMode className="text-base" /> : <MdDarkMode className="text-base" />}
      <span>{label}</span>
    </button>
  );
}

export default ThemeToggle;
