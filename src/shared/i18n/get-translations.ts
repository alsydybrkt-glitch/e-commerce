import { translations } from "./translations";

export type Locale = "en" | "ar";

export function getTranslations(locale: Locale = "en") {
  const t = (key: string, variables?: Record<string, string | number>) => {
    const keys = key.split(".");
    let value: unknown = translations[locale];

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
    const categories = translations[locale].categories as Record<string, { name: string }>;
    const category = categories[slug];
    return category ? category.name : slug;
  };

  const isRTL = locale === "ar";

  return { t, tCategoryName, isRTL, locale };
}
