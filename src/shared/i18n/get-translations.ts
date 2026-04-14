import { translations } from "./translations";

export type Locale = "en" | "ar";

export function getTranslations(localeArg: string = "en") {
  // Ensure we use a supported locale or fallback to 'en'
  const locale = (translations[localeArg as Locale] ? localeArg : "en") as Locale;
  const translationSet = translations[locale];

  const t = (key: string, variables?: Record<string, string | number>) => {
    const keys = key.split(".");
    let value: unknown = translationSet;

    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return the key if not found
      }
    }

    if (typeof value !== "string") return key;

    let result = value;

    if (variables) {
      Object.entries(variables).forEach(([name, val]) => {
        result = result.replace(`{${name}}`, String(val));
      });
    }

    return result;
  };

  const tCategoryName = (slug: string) => {
    const categories = (translationSet as any).categories as Record<string, { name: string }> | undefined;
    if (!categories) return slug;
    
    const category = categories[slug];
    return category ? category.name : slug;
  };

  const isRTL = locale === "ar";

  return { t, tCategoryName, isRTL, locale };
}
