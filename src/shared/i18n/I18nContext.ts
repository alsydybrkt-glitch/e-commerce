"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export type Locale = "en" | "ar";

export interface I18nContextType {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
  toggleLocale: () => void;
  isRTL: boolean;
  t: (key: string, params?: Record<string, string | number>) => any;
  tCategoryName: (slug?: string) => string;
  tCategoryDescription: (slug?: string) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);
