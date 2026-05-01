/**
 * LocalizedContent Helper Component
 * Extracts and displays the correct language value from internationalized Sanity fields
 */

interface LocalizedFieldArray {
  _key: string;
  value: any;
}

interface LocalizedContentProps {
  field: LocalizedFieldArray[] | undefined;
  language: string;
  fallbackLanguage?: string;
}

/**
 * Extract localized value from field array with language fallback
 */
export function getLocalizedValue(
  field: LocalizedFieldArray[] | undefined,
  language: string,
  fallbackLanguage: string = 'en'
): any {
  if (!field || !Array.isArray(field)) {
    return null;
  }

  // Try to find the requested language
  const localized = field.find((item) => item._key === language);
  if (localized) {
    return localized.value;
  }

  // Fallback to fallback language
  if (fallbackLanguage !== language) {
    const fallback = field.find((item) => item._key === fallbackLanguage);
    if (fallback) {
      return fallback.value;
    }
  }

  // Last resort: return first available
  return field[0]?.value ?? null;
}

/**
 * Helper to check if a field is an internationalized array
 */
export function isLocalizedField(field: any): field is LocalizedFieldArray[] {
  return Array.isArray(field) && field.length > 0 && '_key' in field[0];
}
