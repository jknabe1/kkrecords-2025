import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, isValidLanguage, DEFAULT_LANGUAGE } from '@/lib/languages';

/**
 * Middleware to handle language routing
 * - Redirects root to /en or /sv
 * - Validates language in URL
 * - Handles language detection from Accept-Language header
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Extract language from pathname
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // If path is root, redirect to default language
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}`, request.url));
  }

  // Check if first segment is a valid language
  if (!isValidLanguage(firstSegment)) {
    // If not a language, try to detect from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    let detectedLanguage = DEFAULT_LANGUAGE;

    if (acceptLanguage) {
      // Parse accept-language header
      for (const lang of SUPPORTED_LANGUAGES) {
        if (acceptLanguage.includes(lang)) {
          detectedLanguage = lang;
          break;
        }
      }
    }

    // Redirect to detected language path
    return NextResponse.redirect(
      new URL(`/${detectedLanguage}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }

  // Language is valid, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - studio (Sanity studio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
};
