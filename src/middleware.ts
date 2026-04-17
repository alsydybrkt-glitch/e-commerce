import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ar']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Find preferred locale from cookie
  const cookieLocale = request.cookies.get('locale')?.value
  const locale = locales.includes(cookieLocale as string) ? cookieLocale : defaultLocale

  // Redirect to localized path
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets
    '/((?!_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|output.css).*)',
  ],
}
