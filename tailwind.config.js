/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      /* ========== Fonts ========== */

      fontFamily: {
        sans: ["Amazon Ember", "Arial", "Helvetica", "sans-serif"],
        display: ["Amazon Ember", "Arial", "Helvetica", "sans-serif"],
      },

      /* ========== Colors (Design Tokens) ========== */

      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",

        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
        },

        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },

        border: "var(--color-border)",
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
          "radial-gradient(circle at top left, rgba(111,143,129,0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(176,155,134,0.10), transparent 30%)",
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
