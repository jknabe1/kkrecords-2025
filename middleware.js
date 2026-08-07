import { NextResponse } from 'next/server';

const SUPPORTED_LANGUAGES = ['en', 'sv'];
const DEFAULT_LANGUAGE = 'en';

function isValidLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function middleware(request) {
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
    const acceptLanguage = request.headers.get('accept-language') || '';
    let detectedLanguage = DEFAULT_LANGUAGE;

    if (acceptLanguage) {
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
};
