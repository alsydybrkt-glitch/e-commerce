/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/services/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      /* ========== Fonts ========== */

      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-outfit)", "Arial", "Helvetica", "sans-serif"],
      },

      /* ========== Colors (Design Tokens) ========== */

        colors: {
          primary: "var(--color-brand-600)",
          secondary: "var(--color-brand-500)",
          brand: {
            50: "var(--color-brand-50)",
            100: "var(--color-brand-100)",
            500: "var(--color-brand-500)",
            600: "var(--color-brand-600)",
            700: "var(--color-brand-700)",
          },

          bg: {
            primary: "var(--color-bg-primary)",
            secondary: "var(--color-bg-secondary)",
            tertiary: "var(--color-bg-tertiary)",
          },

          surface: {
            primary: "var(--color-surface-primary)",
            secondary: "var(--color-surface-secondary)",
            tertiary: "var(--color-surface-tertiary)",
            interactive: "var(--color-surface-interactive)",
          },

          text: {
            primary: "var(--color-text-primary)",
            secondary: "var(--color-text-secondary)",
            muted: "var(--color-text-tertiary)",
            disabled: "var(--color-text-disabled)",
          },

          border: {
            DEFAULT: "var(--color-border)",
            light: "var(--color-border-light)",
            medium: "var(--color-border-medium)",
            dark: "var(--color-border-dark)",
          },
        },

      /* ========== Spacing ========== */

      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },

      /* ========== Radius ========== */

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },

      /* ========== Shadows ========== */

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
      },

      /* ========== Animation Speed ========== */

      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },

      /* ========== Typography ========== */

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

      /* ========== Z Index System ========== */

      zIndex: {
        dropdown: "var(--z-dropdown)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
        modal: "var(--z-modal)",
      },

      /* ========== Background Effects ========== */

      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(16,185,129,0.05), transparent 40%), radial-gradient(circle at bottom right, rgba(14,165,233,0.05), transparent 40%)",
      },
    },
  },

  plugins: [
    /* Custom Utility Plugin */

    function ({ addUtilities }) {
      const utilities = {
        ".dark-mode-support": {
          "@supports (color-scheme: dark)": {
            colorScheme: "light dark",
          },
        },

        ".glass": {
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      };

      addUtilities(utilities);
    },
  ],
};
// Trigger HMR 1
