/**
 * Language configuration and constants for the multilingual site
 */

export const SUPPORTED_LANGUAGES = ['en', 'sv'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  sv: 'Svenska',
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'EN',
  sv: 'SV',
};

/**
 * Check if a value is a supported language
 */
export function isValidLanguage(value: unknown): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

/**
 * Get the default language fallback
 */
export function getDefaultLanguage(): Language {
  return DEFAULT_LANGUAGE;
}

/**
 * Get the alternative language (for toggle)
 */
export function getAlternativeLanguage(lang: Language): Language {
  return lang === 'en' ? 'sv' : 'en';
}
