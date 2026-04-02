import { useEffect, useMemo, useState } from "react";
import { translations } from "./translations";
import { I18nContext } from "./I18nContext";

const LOCALE_STORAGE_KEY = "locale";
const defaultLocale = "en";

function getStoredLocale() {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return storedLocale === "ar" ? "ar" : defaultLocale;
}

function getNestedValue(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

function interpolate(template, params = {}) {
  if (typeof template !== "string") {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(getStoredLocale);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale]);

  const value = useMemo(() => {
    const dictionary = translations[locale] ?? translations[defaultLocale];

    const t = (key, params) => {
      const result =
        getNestedValue(dictionary, key) ??
        getNestedValue(translations[defaultLocale], key) ??
        key;

      return interpolate(result, params);
    };

    const tCategoryName = (slug = "") =>
      t(`categories.${slug}.name`) !== `categories.${slug}.name`
        ? t(`categories.${slug}.name`)
        : slug.replace(/-/g, " ");

    const tCategoryDescription = (slug = "") =>
      t(`categories.${slug}.description`) !== `categories.${slug}.description`
        ? t(`categories.${slug}.description`)
        : "";

    return {
      locale,
      setLocale,
      toggleLocale: () => setLocale((current) => (current === "en" ? "ar" : "en")),
      isRTL: locale === "ar",
      t,
      tCategoryName,
      tCategoryDescription,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
