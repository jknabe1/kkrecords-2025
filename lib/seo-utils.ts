/**
 * SEO Utilities for Multilingual Support
 * Includes hreflang generation and canonical URL handling
 */

import { Metadata } from 'next';

export const SITE_URL = 'https://kkrecords.se';
export const SUPPORTED_LANGUAGES = ['en', 'sv'];
export const DEFAULT_LANGUAGE = 'en';

/**
 * Generate alternates object for hreflang tags
 */
export function generateLanguageAlternates(
  path: string = ''
): Metadata['alternates'] {
  const baseUrl = `${SITE_URL}`;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return {
    canonical: `${baseUrl}/${DEFAULT_LANGUAGE}${cleanPath}`,
    languages: {
      en: `${baseUrl}/en${cleanPath}`,
      sv: `${baseUrl}/sv${cleanPath}`,
      'x-default': `${baseUrl}${cleanPath}`,
    },
  };
}

/**
 * Generate hreflang link tags for HTML head
 */
export function generateHrefLangLinks(currentPath: string, currentLang: string) {
  const links: Array<{ rel: string; hrefLang?: string; href: string }> = [];

  // Add canonical link
  links.push({
    rel: 'canonical',
    href: `${SITE_URL}/${currentLang}${currentPath}`,
  });

  // Add language alternates
  SUPPORTED_LANGUAGES.forEach((lang) => {
    links.push({
      rel: 'alternate',
      hrefLang: lang,
      href: `${SITE_URL}/${lang}${currentPath}`,
    });
  });

  // Add x-default for language detection
  links.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${SITE_URL}${currentPath}`,
  });

  return links;
}

/**
 * Generate Open Graph metadata for a specific language
 */
export function generateOGMetadata(
  lang: string,
  title: string,
  description: string,
  path: string = ''
) {
  const locale = lang === 'sv' ? 'sv_SE' : 'en_US';
  const url = `${SITE_URL}/${lang}${path}`;

  return {
    title,
    description,
    url,
    locale,
    type: 'website' as const,
  };
}
