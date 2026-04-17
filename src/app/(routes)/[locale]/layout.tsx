import { Providers } from './providers'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export default function LocalizedLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const initialLocale = (locale === 'ar' ? 'ar' : 'en') as 'en' | 'ar'
  const initialTheme = 'light' // Initial server render state

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-6 focus:py-3 focus:bg-brand-600 focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-bold focus:outline-none transition-all"
      >
        {initialLocale === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>
      <Providers initialTheme={initialTheme} initialLocale={initialLocale}>
        <div id="main-content" className={`flex flex-col min-h-screen ${initialLocale === 'ar' ? 'font-arabic' : ''}`}>
          {children}
        </div>
      </Providers>
    </>
  )
}
