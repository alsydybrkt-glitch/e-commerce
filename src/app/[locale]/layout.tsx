import type { Metadata } from 'next'

import { Inter, Outfit } from 'next/font/google'
import Script from 'next/script'
import '@/app/styles/index.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: {
    default: 'Aura-Market | Premium E-Commerce Experience',
    template: '%s | Aura-Market'
  },
  description: 'Discover the future of shopping with Aura-Market. Premium products, seamless experience, and lightning-fast delivery.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aura-market.vercel.app'),
  keywords: ['e-commerce', 'premium products', 'modern shop', 'aura-market'],
  authors: [{ name: 'Aura-Market Team' }],
  creator: 'Aura-Market',
  publisher: 'Aura-Market',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aura-market.example.com',
    siteName: 'Aura-Market',
    title: 'Aura-Market | Modern Shopping Redefined',
    description: 'The ultimate premium e-commerce platform for modern lifestyles.',
    images: [{ url: '/images/img/og-image.jpg', width: 1200, height: 630, alt: 'Aura-Market OG Image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura-Market | Premium Shopping',
    description: 'The ultimate premium e-commerce platform.',
    images: ['/images/img/og-image.jpg'],
  },
}

type Theme = 'light' | 'dark'
type Locale = 'en' | 'ar'

const THEME_COOKIE_KEY = 'theme'
const LOCALE_COOKIE_KEY = 'locale'

const themeScript = `(function() {
  try {
    var tk = '${THEME_COOKIE_KEY}';
    var lk = '${LOCALE_COOKIE_KEY}';
    var h = document.documentElement;
    var getC = function(n) {
      var v = document.cookie.match('(^|;) ?' + n + '=([^;]*)(;|$)');
      return v ? decodeURIComponent(v[2]) : null;
    };
    var setC = function(n, v) {
      document.cookie = n + '=' + v + '; path=/; max-age=31536000; SameSite=Lax';
    };
    var getS = function(n) { return window.localStorage.getItem(n); };

    var l = getC(lk) || getS(lk) || 'en';
    if (l !== 'en' && l !== 'ar') l = 'en';
    h.lang = l;
    h.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (!getC(lk)) setC(lk, l);

    var t = getC(tk) || getS(tk);
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var isD = t === 'dark';
    h.dataset.theme = t;
    h.classList.toggle('dark', isD);
    h.style.colorScheme = isD ? 'dark' : 'light';
    if (!getC(tk)) setC(tk, t);
  } catch (e) {}
})();`

const getInitialTheme = (value: string | undefined): Theme =>
  value === 'dark' ? 'dark' : 'light'

const getInitialLocale = (value: string | undefined): Locale =>
  value === 'ar' ? 'ar' : 'en'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const initialLocale = (locale === 'ar' ? 'ar' : 'en') as Locale
  const initialTheme: Theme = 'light' // Statically rendered as light, toggled instantly via themeScript
  const isDark = false

  return (
    <html
      lang={initialLocale}
      dir={initialLocale === 'ar' ? 'rtl' : 'ltr'}
      data-theme={initialTheme}
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`font-sans antialiased text-slate-900 dark:text-slate-50 dark:bg-slate-950`}
        suppressHydrationWarning
      >
        <Providers initialTheme={initialTheme} initialLocale={initialLocale}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
