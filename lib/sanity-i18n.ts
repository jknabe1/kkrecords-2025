import { Language } from '@/lib/languages';

/**
 * Helper to build GROQ filter for a specific language in internationalized fields
 * Assumes Sanity fields are stored as: { _key: 'en', value: '...' } or { _key: 'sv', value: '...' }
 */
export function buildLanguageFilter(language: Language): string {
  return `_key == "${language}"`;
}

/**
 * Project translated fields to get the value for a specific language
 * Usage in GROQ: "title": select(@->*[${getLanguageProjection('title', 'en')}])
 */
export function getLanguageProjection(fieldPath: string, language: Language): string {
  return `${fieldPath}[${buildLanguageFilter(language)}].value`;
}

/**
 * Select the value from an internationalized array field for a specific language
 * Fallback to first available language if not found
 */
export function getLocalizedFieldGroq(fieldName: string, language: Language): string {
  return `(${fieldName}[_key == "${language}"].value // ${fieldName}[0].value)`;
}

/**
 * Build complete query projection for fetching a document with all translations
 * This keeps all language variants in a single query for efficiency
 */
export function buildLanguageAwareQuery(baseQuery: string, language: Language): string {
  // The base query should already handle internationalized fields
  // This function is here for complex queries that need language logic
  return baseQuery;
}

/**
 * Helper type for internationalized field in Sanity
 */
export interface LocalizedField {
  _key: Language;
  value: string;
}

export interface LocalizedFieldFull {
  _key: Language;
  value: string;
  _type: 'object';
}

/**
 * Extract value from localized field array, with fallback
 */
export function getLocalizedValue(
  fieldArray: LocalizedField[] | undefined,
  language: Language,
  fallbackLanguage: Language = 'en'
): string {
  if (!fieldArray || !Array.isArray(fieldArray)) return '';

  // Try to find the requested language
  const localized = fieldArray.find((item) => item._key === language);
  if (localized) return localized.value;

  // Fallback to default language
  const fallback = fieldArray.find((item) => item._key === fallbackLanguage);
  if (fallback) return fallback.value;

  // Last resort: return first available
  return fieldArray[0]?.value || '';
}
