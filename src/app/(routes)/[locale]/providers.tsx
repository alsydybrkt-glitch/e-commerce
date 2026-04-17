"use client";
import { Suspense, useEffect, useMemo, useState, lazy } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import dynamic from 'next/dynamic'

const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), { ssr: false })
const ScrollToTop = dynamic(() => import('@/shared/ui/ScrollToTop'), { ssr: false })
import { Provider as ReduxProvider } from 'react-redux'
import Footer from '@/shared/components/layout/footer/Footer'
import Header from '@/shared/components/layout/header/Header'
import { ThemeContext } from '@/config/theme/ThemeContext'
import { LoadingBar } from '@/shared/ui/LoadingBar'
import { I18nContext } from '@/config/i18n/I18nContext'
import { translations } from '@/config/i18n/translations'
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

    if (body && !body.classList.contains(`theme-${theme}`)) {
      body.classList.remove('theme-dark', 'theme-light')
      body.classList.add(`theme-${theme}`)
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
    <LazyMotion features={domAnimation}>
      <I18nContext.Provider value={i18nValue}>
        <ThemeContext.Provider value={themeValue}>
          <ReduxProvider store={store}>
            <Suspense fallback={null}>
              <LoadingBar />
            </Suspense>

            <Header />
            <main className="flex-grow">
              <Suspense fallback={
                <div className="shell py-20 flex items-center justify-center">
                  <div className="h-24 w-24 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
                </div>
              }>
                {children}
              </Suspense>
            </main>
            <Footer />

            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 4000,
                className: "premium-toast",
                style: {
                  background: theme === "dark" ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.85)",
                  color: theme === "dark" ? "#f8fafc" : "#0f172a",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
                  borderRadius: "1.25rem",
                  padding: "16px 24px",
                  fontSize: "0.9375rem",
                  fontWeight: "500",
                  letterSpacing: "-0.01em",
                  boxShadow: theme === "dark"
                    ? "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
                    : "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
                },
                success: {
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#f43f5e",
                    secondary: "#fff",
                  },
                },
              }}
            />
            <ScrollToTop />
          </ReduxProvider>
        </ThemeContext.Provider>
      </I18nContext.Provider>
    </LazyMotion>
  )
}
