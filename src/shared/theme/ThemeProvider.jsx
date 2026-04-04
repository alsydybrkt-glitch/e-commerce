import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const THEME_STORAGE_KEY = "theme";

function getPreferredTheme() {
  if (typeof window === "undefined") return "light";

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    if (typeof document !== "undefined") {
      const html = document.documentElement;
      const body = document.body;
      const isDark = theme === "dark";

      // ✅ For Tailwind darkMode: ["selector", '[data-theme="dark"]']
      html.dataset.theme = theme;

      // ✅ For Tailwind darkMode: "class" (if any utility uses dark:)
      html.classList.toggle("dark", isDark);

      // ✅ For legacy custom CSS that uses body.theme-dark
      body.classList.toggle("theme-dark", isDark);
      body.classList.toggle("theme-light", !isDark);

      // ✅ For native browser color scheme
      html.style.colorScheme = isDark ? "dark" : "light";
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme: () =>
        setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}