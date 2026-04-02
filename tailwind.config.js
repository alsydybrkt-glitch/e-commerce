/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  darkMode: ["class", '[class~="theme-dark"]'],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Amazon Ember", "Arial", "Helvetica", "sans-serif"],
        display: ["Amazon Ember", "Arial", "Helvetica", "sans-serif"],
      },

      /* DESIGN TOKENS */

      colors: {
        background: "var(--color-bg-primary)",
        surface: "var(--color-surface-primary)",

        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-tertiary)",
        },

        border: {
          DEFAULT: "var(--color-border-light)",
          strong: "var(--color-border-medium)",
          focus: "var(--color-border-focus)",
        },

        /* BRAND */

        brand: {
          50: "#f2f5f4",
          100: "#e2e9e6",
          200: "#cad8d2",
          400: "#8aa79a",
          500: "#6f8f81",
          600: "#5f7b6f",
          700: "#4f665d",
        },

        /* ACCENT */

        accent: {
          400: "#c9b8a6",
          500: "#b09b86",
        },

        /* SEMANTIC COLORS */

        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",

        ink: "#09111f",
        mist: "#f4f5f3",
      },

      /* SHADOWS */

      boxShadow: {
        glow: "0 20px 60px rgba(95, 123, 111, 0.14)",
        card: "0 16px 38px rgba(15, 23, 42, 0.06)",
      },

      /* BACKGROUNDS */

      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(111,143,129,0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(176,155,134,0.10), transparent 30%)",
      },

      /* TYPOGRAPHY */

      lineHeight: {
        tight: "1.3",
        normal: "1.6",
        relaxed: "1.8",
        loose: "2",
      },

      letterSpacing: {
        tighter: "-0.5px",
        tight: "0px",
        normal: "0.5px",
        wide: "1px",
        wider: "1.5px",
      },

      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },

  plugins: [],
};
