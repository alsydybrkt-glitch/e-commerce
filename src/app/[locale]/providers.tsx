'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Provider as ReduxProvider } from 'react-redux'
import Footer from '@/shared/components/layout/footer/Footer'
import Header from '@/shared/components/layout/header/Header'
import { ThemeContext } from '@/components/providers/ThemeContext'
import { LoadingBar } from '@/shared/ui/LoadingBar'
import ScrollToTop from '@/shared/ui/ScrollToTop'
import { I18nContext } from '@/shared/i18n/I18nContext'
import { translations } from '@/shared/i18n/translations'
import store from '@/store'

type Theme = 'light' | 'dark'
type Locale = 'en' | 'ar'

const THEME_STORAGE_KEY = 'theme'
const LOCALE_STORAGE_KEY = 'locale'
const COOKIE_MAX_AGE = 31536000

type ProvidersProps = {
  children: React.ReactNode
  initialTheme: Theme
  initialLocale: Locale
}

function getNestedValue(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((value, key) => {
    if (typeof value !== 'object' || value === null) {
      return undefined
    }

    return (value as Record<string, unknown>)[key]
  }, source)
}

function interpolate(template: unknown, params: Record<string, string | number>): unknown {
  if (typeof template !== 'string') return template

  return template.replace(/\{(\w+)\}/g, (_match, key: string) =>
    String(params[key] ?? `{${key}}`),
  )
}

export function Providers({ children, initialTheme, initialLocale }: ProvidersProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [mounted, setMounted] = useState(false)

  // Sync theme
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const isDark = theme === 'dark'

    // Only update if actually different to avoid redundant reflows
    if (html.dataset.theme !== theme) {
      html.dataset.theme = theme
      html.classList.toggle('dark', isDark)
      html.style.colorScheme = isDark ? 'dark' : 'light'
    }

    if (body) {
      body.classList.toggle('theme-dark', isDark)
      body.classList.toggle('theme-light', !isDark)
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    document.cookie = `${THEME_STORAGE_KEY}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
  }, [theme])

  // Sync locale
  useEffect(() => {
    const html = document.documentElement
    const isRTL = locale === 'ar'

    if (html.lang !== locale || html.dir !== (isRTL ? 'rtl' : 'ltr')) {
      html.lang = locale
      html.dir = isRTL ? 'rtl' : 'ltr'
    }

    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.cookie = `${LOCALE_STORAGE_KEY}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
  }, [locale])

  // Handle client-side initialization from localStorage if server-side was missing
  useEffect(() => {
    setMounted(true)
    
    // Check if we need to sync from localStorage (only on first mount)
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme
    if (storedTheme && storedTheme !== theme && (storedTheme === 'light' || storedTheme === 'dark')) {
      setTheme(storedTheme)
    }

    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY) as Locale
    if (storedLocale && storedLocale !== locale && (storedLocale === 'en' || storedLocale === 'ar')) {
      setLocale(storedLocale)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const themeValue = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme: () =>
        setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  const i18nValue = useMemo(() => {
    const activeDictionary = translations[locale] ?? translations.en
    const fallbackDictionary = translations.en

    const t = (key: string, params: Record<string, string | number> = {}): string => {
      const result =
        getNestedValue(activeDictionary, key) ??
        getNestedValue(fallbackDictionary, key) ??
        key

      return interpolate(result, params) as string
    }

    const tCategoryName = (slug = ''): string => {
      const translated = t(`categories.${slug}.name`)
      return translated !== `categories.${slug}.name`
        ? (translated as string)
        : slug.replace(/-/g, ' ')
    }

    const tCategoryDescription = (slug = ''): string => {
      const translated = t(`categories.${slug}.description`)
      return translated !== `categories.${slug}.description` ? (translated as string) : ''
    }

    return {
      locale,
      setLocale,
      toggleLocale: () => {
        const nextLocale = locale === 'en' ? 'ar' : 'en'
        setLocale(nextLocale)
        // Also change the URL path
        if (typeof window !== 'undefined') {
          const pathname = window.location.pathname
          const segments = pathname.split('/')
          if (segments[1] === locale) {
            segments[1] = nextLocale
            window.location.href = segments.join('/')
          } else {
            window.location.href = `/${nextLocale}${pathname}`
          }
        }
      },
      isRTL: locale === 'ar',
      t,
      tCategoryName,
      tCategoryDescription,
    }
  }, [locale])

  return (
    <I18nContext.Provider value={i18nValue}>
      <ThemeContext.Provider value={themeValue}>
        <ReduxProvider store={store}>
          <Suspense fallback={null}>
            <LoadingBar />
          </Suspense>

          <Header />
          <main className="flex-grow">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
          <Footer />

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#e9e9e9',
                borderRadius: '5px',
                padding: '8px',
              },
            }}
          />
          <ScrollToTop />
        </ReduxProvider>
      </ThemeContext.Provider>
    </I18nContext.Provider>
  )
}
