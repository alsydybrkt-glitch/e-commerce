/** @type {import('tailwindcss').Config} */

/**
 * Updated Tailwind Configuration
 * Integrates with the new design token system
 * Uses CSS variables for dynamic theming support
 */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ["Amazon Ember", "Arial", "Helvetica", "sans-serif"],
        display: ["Amazon Ember", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        /* Use CSS variables from design-tokens.css */
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
        },
        surface: {
          primary: "var(--color-surface-primary)",
          secondary: "var(--color-surface-secondary)",
          tertiary: "var(--color-surface-tertiary)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          disabled: "var(--color-text-disabled)",
          inverse: "var(--color-text-inverse)",
        },
        border: {
          light: "var(--color-border-light)",
          medium: "var(--color-border-medium)",
          dark: "var(--color-border-dark)",
          focus: "var(--color-border-focus)",
        },
        /* Brand palette */
        brand: {
          50: "#f2f5f4",
          100: "#e2e9e6",
          200: "#cad8d2",
          400: "#8aa79a",
          500: "#6f8f81",
          600: "#5f7b6f",
          700: "#4f665d",
        },
        /* Status colors */
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",

        /* Legacy colors for backward compatibility */
        ink: "#09111f",
        mist: "#f4f5f3",
        accent: {
          400: "#c9b8a6",
          500: "#b09b86",
        },
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
      lineHeight: {
        tight: "var(--line-height-tight)",
        normal: "var(--line-height-normal)",
        relaxed: "var(--line-height-relaxed)",
        loose: "var(--line-height-loose)",
      },
      letterSpacing: {
        tighter: "var(--letter-spacing-tighter)",
        tight: "var(--letter-spacing-tight)",
        normal: "var(--letter-spacing-normal)",
        wide: "var(--letter-spacing-wide)",
        wider: "var(--letter-spacing-wider)",
      },
      zIndex: {
        dropdown: "var(--z-dropdown)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(111,143,129,0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(176,155,134,0.10), transparent 30%)",
      },
    },
  },
  plugins: [
    /**
     * Custom plugin for enhanced dark mode utilities
     * Provides additional utilities for theme-specific styling
     */
    function ({ addUtilities, e, theme }) {
      const darkModeUtilities = {
        ".dark-mode-support": {
          "@supports (color-scheme: dark)": {
            colorScheme: "light dark",
          },
        },
      };

      addUtilities(darkModeUtilities);
    },
  ],
};
