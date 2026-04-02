/**
 * QUICK START IMPLEMENTATION GUIDE
 * How to integrate the new design token system into your e-commerce project
 */

// ============================================================================
// STEP 1: Update your main.jsx or CSS entry point
// ============================================================================

// In src/main.jsx, add these imports at the top:
import './shared/styles/design-tokens.css'
import './shared/styles/global.css'
import './shared/styles/components.css'

// ============================================================================
// STEP 2: Update the Theme Toggle Component
// ============================================================================

// File: src/shared/theme/ThemeProvider.jsx

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme-preference')
    if (saved) return saved === 'dark'
    
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    if (isDark) {
      root.classList.add('dark')
      body.classList.add('theme-dark')
    } else {
      root.classList.remove('dark')
      body.classList.remove('theme-dark')
    }
    
    // Save preference
    localStorage.setItem('theme-preference', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// ============================================================================
// STEP 3: Update Theme Toggle Button Component
// ============================================================================

// File: src/shared/ui/ThemeToggle.jsx

import { useTheme } from '../theme/ThemeProvider'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current: ${isDark ? 'Dark' : 'Light'} mode`}
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}

// ============================================================================
// STEP 4: Update Component Examples
// ============================================================================

// BEFORE: Using Tailwind with manual dark mode class names
// File: src/features/catalog/slide-product/product.jsx (BEFORE)
export default function Product({ item }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
      <h3 className="text-gray-900 dark:text-white mt-2 font-semibold">
        {item.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {item.price}
      </p>
      <button className="mt-2 bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  )
}

// AFTER: Using design tokens and semantic classes
export default function Product({ item }) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={item.img} alt={item.title} />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{item.title}</h3>
        <span className="product-card-price">{item.price}</span>
        <button className="btn btn-primary w-full">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// STEP 5: Update Category Card Component
// ============================================================================

// File: src/features/catalog/categories-grid/CategoryCard.jsx (BEFORE & AFTER)

import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

function CategoryCard({ subtitle, title, slug, img }) {
  return (
    <Link
      to={`/category/${slug}`}
      className="surface-card p-6 sm:p-7 group relative overflow-hidden transition-all hover:shadow-lg"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-x-0 top-0 h-28 opacity-50" />
      <div className="absolute top-0 h-36 w-36 rounded-full bg-brand-100/30 blur-3xl" />

      <div className="relative flex h-full min-h-[24rem] flex-col justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
            {subtitle}
          </p>
          <h3 className="min-h-[4rem] text-2xl font-bold leading-tight sm:text-3xl">
            {title}
          </h3>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            Browse Now
            <FiArrowUpRight className="transition group-hover:translate-x-1" />
          </div>
        </div>

        {/* Image Container */}
        <div className="overflow-hidden rounded-2xl border border-border-light">
          {img ? (
            <img
              src={img}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-52 w-full object-contain transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-52 items-center justify-center bg-surface-secondary">
              <span className="text-text-tertiary">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default memo(CategoryCard)

// ============================================================================
// STEP 6: Update Header Component
// ============================================================================

// File: src/widgets/layout/header/Header.jsx

import { ThemeToggle } from '../../../shared/ui/ThemeToggle'

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header-inner max-w-7xl mx-auto px-4">
        {/* Logo */}
        <h1 className="site-header-logo">
          YourStore
        </h1>

        {/* Navigation */}
        <nav className="site-header-nav">
          <a href="/" className="site-header-nav-item">Home</a>
          <a href="/shop" className="site-header-nav-item">Shop</a>
          <a href="/about" className="site-header-nav-item">About</a>
          <a href="/contact" className="site-header-nav-item">Contact</a>
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="btn btn-secondary">
            🛒 Cart
          </button>
        </div>
      </div>
    </header>
  )
}

// ============================================================================
// STEP 7: Create Reusable Button Component
// ============================================================================

// File: src/shared/ui/Button.jsx

import { forwardRef } from 'react'

export const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'btn'
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
    }
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
    }

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Usage:
// <Button variant="primary" size="lg">Click Me</Button>
// <Button variant="secondary" disabled>Disabled</Button>

// ============================================================================
// STEP 8: Update CSS Imports in index.css
// ============================================================================

// File: src/shared/styles/index.css (REPLACE with new imports)

@import './design-tokens.css';
@import './global.css';
@import './components.css';

/* Optional: Add any project-specific overrides here */

// ============================================================================
// STEP 9: Tailwind Configuration
// ============================================================================

// File: tailwind.config.js (REPLACE with updated config)
// Copy contents from tailwind.config.updated.js

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
        },
        border: {
          light: 'var(--color-border-light)',
          medium: 'var(--color-border-medium)',
        },
        brand: {
          50: '#f2f5f4',
          100: '#e2e9e6',
          500: '#6f8f81',
          600: '#5f7b6f',
          700: '#4f665d',
        },
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        glow: 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
}

// ============================================================================
// STEP 10: CSS Variable Usage Examples
// ============================================================================

// Using CSS variables in custom CSS:
.custom-component {
  background-color: var(--color-surface-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-base);
}

.custom-component:hover {
  background-color: var(--color-surface-secondary);
  box-shadow: var(--shadow-lg);
}

// ============================================================================
// STEP 11: Test Checklist
// ============================================================================

/*
Testing Checklist:
□ Theme toggle works (light ↔ dark)
□ All colors apply correctly in both modes
□ Text contrast is readable (WCAG AA)
□ Focus ring visible on all interactive elements
□ Buttons maintain proper styling
□ Cards and surfaces display correctly
□ Transitions are smooth
□ Responsive on mobile
□ No console errors
□ localStorage saves theme preference
□ System preference detection works
□ Keyboard navigation works
□ Screen reader friendly
*/

// ============================================================================
// TROUBLESHOOTING
// ============================================================================

// Problem: Dark mode not applying
// Solution:
// 1. Check if .theme-dark class is on body: console.log(document.body.classList)
// 2. Verify CSS variables loaded: console.log(getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary'))
// 3. Clear browser cache and rebuild

// Problem: Colors different than expected
// Solution:
// 1. Check CSS import order in main.jsx
// 2. Verify design-tokens.css loads before other CSS
// 3. Check for conflicting Tailwind classes

// Problem: Transitions not smooth
// Solution:
// 1. Verify --transition-base is set to 220ms
// 2. Check for prefers-reduced-motion override
// 3. Ensure all elements have transition property

// ============================================================================
