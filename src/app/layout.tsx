import type { Metadata } from 'next'
import { Inter, Outfit, Cairo } from 'next/font/google'
import '@/styles/index.css'

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

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'Aura | Premium E-Commerce Experience',
    template: '%s | Aura'
  },
  description: 'Discover the future of shopping with Aura. Premium products, seamless experience, and lightning-fast delivery.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aura.vercel.app'),
  keywords: ['e-commerce', 'premium products', 'modern shop', 'aura'],
}

const themeScript = `(function() {
  try {
    var tk = 'theme';
    var lk = 'locale';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${cairo.variable}`}
    >
      <head>
        <script id="theme-strategy" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-col min-h-screen font-sans antialiased text-slate-900 dark:text-slate-50 dark:bg-slate-950" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
