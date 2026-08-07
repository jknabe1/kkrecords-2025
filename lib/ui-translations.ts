/**
 * UI Text Translations for K&K Records
 * Centralized translation strings for common UI elements
 */

export const UITranslations = {
  en: {
    language: 'English',
    home: 'Home',
    artists: 'Artists',
    events: 'Events',
    news: 'News',
    about: 'About Us',
    contact: 'Contact',
    language: 'Language',
    swedish: 'Swedish',
    english: 'English',
    noResults: 'No results found',
    loading: 'Loading...',
    error: 'An error occurred',
    backToHome: 'Back to Home',
    readMore: 'Read More',
    learnMore: 'Learn More',
    ticketPrice: 'Ticket Price',
    startDate: 'Start Date',
    endDate: 'End Date',
    description: 'Description',
    searchPlaceholder: 'Search...',
  },
  sv: {
    language: 'Språk',
    home: 'Hem',
    artists: 'Artister',
    events: 'Evenemang',
    news: 'Nyheter',
    about: 'Om oss',
    contact: 'Kontakt',
    language: 'Språk',
    swedish: 'Svenska',
    english: 'Engelska',
    noResults: 'Inga resultat hittades',
    loading: 'Laddar...',
    error: 'Ett fel uppstod',
    backToHome: 'Tillbaka till startsidan',
    readMore: 'Läs mer',
    learnMore: 'Läs mer',
    ticketPrice: 'Biljettspris',
    startDate: 'Startdatum',
    endDate: 'Slutdatum',
    description: 'Beskrivning',
    searchPlaceholder: 'Sök...',
  },
};

export function getTranslation(lang: string, key: keyof typeof UITranslations.en): string {
  const translations = UITranslations[lang as keyof typeof UITranslations] || UITranslations.en;
  return translations[key] || key;
}
