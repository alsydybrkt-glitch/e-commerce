import { createContext, Dispatch, SetStateAction } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: Dispatch<SetStateAction<Theme>>;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
