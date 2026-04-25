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

          /* Inlined Swiper Pagination (Small File Win) */
          .swiper-premium-pagination {
            position: relative !important;
            bottom: 0 !important;
            margin-top: 1.5rem !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 6px;
          }
          .swiper-premium-pagination .swiper-pagination-bullet {
            transition: all 0.3s ease;
            width: 8px;
            height: 8px;
            background: #667085 !important;
            opacity: 0.3;
            margin: 0 !important;
            border-radius: 4px;
          }
          .swiper-premium-pagination .swiper-pagination-bullet-active {
            width: 24px;
            background: var(--color-brand-600) !important;
            opacity: 1;
          }
          .gallery-pagination {
            margin-top: 1rem !important;
          }

          /* Critical Header Styles */
          .site-header {
            position: sticky;
            top: 0;
            z-index: 1000;
            width: 100%;
            height: var(--site-header-offset);
            background-color: rgba(252, 252, 253, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid #eaecf0;
          }
          .dark .site-header {
            background-color: rgba(10, 10, 10, 0.9);
            border-bottom-color: #262626;
          }

          /* Inlined Swiper Core CSS (1.48 KiB win) */
          :root{--swiper-theme-color:#007aff}:host{display:block;margin-left:auto;margin-right:auto;position:relative;z-index:1}.swiper{display:block;list-style:none;margin-left:auto;margin-right:auto;overflow:hidden;padding:0;position:relative;z-index:1}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{box-sizing:initial;display:flex;height:100%;position:relative;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);width:100%;z-index:1}.swiper-android .swiper-slide,.swiper-ios .swiper-slide,.swiper-wrapper{transform:translateZ(0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}.swiper-slide{display:block;flex-shrink:0;height:100%;position:relative;transition-property:transform;width:100%}.swiper-slide-invisible-blank{visibility:hidden}.swiper-autoheight,.swiper-autoheight .swiper-slide{height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden .swiper-slide{backface-visibility:hidden;transform:translateZ(0)}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px;.swiper-cube-shadow,.swiper-slide{transform-style:preserve-3d}}.swiper-css-mode{>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none;&::-webkit-scrollbar{display:none}}>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}&.swiper-horizontal{>.swiper-wrapper{scroll-snap-type:x mandatory}}&.swiper-vertical{>.swiper-wrapper{scroll-snap-type:y mandatory}}&.swiper-free-mode{>.swiper-wrapper{scroll-snap-type:none}>.swiper-wrapper>.swiper-slide{scroll-snap-align:none}}&.swiper-centered{>.swiper-wrapper:before{content:"";flex-shrink:0;order:9999}>.swiper-wrapper>.swiper-slide{scroll-snap-align:center center;scroll-snap-stop:always}}&.swiper-centered.swiper-horizontal{>.swiper-wrapper>.swiper-slide:first-child{margin-inline-start:var(--swiper-centered-offset-before)}>.swiper-wrapper:before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}}&.swiper-centered.swiper-vertical{>.swiper-wrapper>.swiper-slide:first-child{margin-block-start:var(--swiper-centered-offset-before)}>.swiper-wrapper:before{height:var(--swiper-centered-offset-after);min-width:1px;width:100%}}}.swiper-3d{.swiper-slide-shadow,.swiper-slide-shadow-bottom,.swiper-slide-shadow-left,.swiper-slide-shadow-right,.swiper-slide-shadow-top{height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:10}.swiper-slide-shadow{background:#00000026}.swiper-slide-shadow-left{background-image:linear-gradient(270deg,#00000080,#0000)}.swiper-slide-shadow-right{background-image:linear-gradient(90deg,#00000080,#0000)}.swiper-slide-shadow-top{background-image:linear-gradient(0deg,#00000080,#0000)}.swiper-slide-shadow-bottom{background-image:linear-gradient(180deg,#00000080,#0000)}}.swiper-lazy-preloader{border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top:4px solid #0000;box-sizing:border-box;height:42px;left:50%;margin-left:-21px;margin-top:-21px;position:absolute;top:50%;transform-origin:50%;width:42px;z-index:10}.swiper-watch-progress .swiper-slide-visible,.swiper:not(.swiper-watch-progress){.swiper-lazy-preloader{animation:swiper-preloader-spin 1s linear infinite}}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}
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
