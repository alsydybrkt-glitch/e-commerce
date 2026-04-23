import type { Metadata } from 'next'
import { Outfit, Cairo } from 'next/font/google'
import '@/styles/globals.css'


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true, // ✅ مهم
})

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
  preload: false, // Keep Arabic font non-critical for non-Arabic first paint
})

export const metadata: Metadata = {
  title: {
    default: 'Aura | Premium E-Commerce Experience',
    template: '%s | Aura'
  },
  description: 'Discover the future of shopping with Aura.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aura.vercel.app'),
}

const themeScript = `(function(){try{var t='theme',l='locale',h=document.documentElement;
var gC=function(n){var v=document.cookie.match('(^|;) ?'+n+'=([^;]*)(;|$)');
return v?decodeURIComponent(v[2]):null};
var sC=function(n,v){document.cookie=n+'='+v+'; path=/; max-age=31536000; SameSite=Lax'};
var gS=function(n){return localStorage.getItem(n)};
var loc=gC(l)||gS(l)||'en';
if(loc!=='en'&&loc!=='ar')loc='en';
h.lang=loc;h.dir=loc==='ar'?'rtl':'ltr';if(!gC(l))sC(l,loc);
var th=gC(t)||gS(t);
if(!th)th=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
var d=th==='dark';h.dataset.theme=th;h.classList.toggle('dark',d);
h.style.colorScheme=d?'dark':'light';if(!gC(t))sC(t,th);
}catch(e){}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${outfit.variable} ${cairo.variable}`}
    >
      <head>

        {/* ✅ Resource Hints */}
        <link rel="preconnect" href="https://dummyjson.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* ✅ LCP Image Preload */}
        <link 
          rel="preload" 
          as="image" 
          href="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1600&q=80"
          fetchPriority="high"
        />

        {/* ✅ Strategic Critical CSS (Prevent Layout Shift) */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --color-bg-primary: #fcfcfd;
            --color-text-primary: #101828;
            --color-brand-500: #10b981;
            --site-header-offset: 80px;
          }
          .dark {
            --color-bg-primary: #0a0a0a;
            --color-text-primary: #fafafa;
          }
          body {
            margin: 0;
            padding: 0;
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
            font-family: var(--font-outfit), sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
          }
          .shell {
            width: 100%;
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          @media (min-width: 640px) { .shell { padding-left: 1.5rem; padding-right: 1.5rem; } }
          @media (min-width: 1024px) { .shell { padding-left: 2rem; padding-right: 2rem; } }
          
          /* Hero Placeholder to prevent LCP shift */
          .hero-slider-placeholder {
            aspect-ratio: 16/9;
            width: 100%;
            background: var(--color-bg-secondary);
            border-radius: 24px;
          }
        `}} />

        {/* ✅ Theme Initialization (Blocking but minimal) */}
        <script 
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />


      </head>

      <body className="flex flex-col min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
