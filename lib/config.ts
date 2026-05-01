/**
 * Environment Variables Configuration
 * Required environment variables for the multilingual setup
 */

// Sanity Configuration
export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '44gy0hz3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: true,
  useStudio: process.env.NODE_ENV === 'development',
};

// Language Configuration
export const LANGUAGE_CONFIG = {
  supported: ['en', 'sv'],
  default: 'en',
  displayNames: {
    en: 'English',
    sv: 'Svenska',
  },
  locales: {
    en: 'en-US',
    sv: 'sv-SE',
  },
};

// Site Configuration
export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kkrecords.se',
  name: 'K&K Records',
  description: {
    en: 'A Different Kind of Record Label',
    sv: 'Inte den vanliga sortens skivbolag',
  },
  social: {
    instagram: 'https://instagram.com/kkrecords.se',
    facebook: 'https://facebook.com/kkmusicrecords',
  },
};

// Caching Configuration
export const CACHE_CONFIG = {
  // ISR revalidation intervals (in seconds)
  homePage: 3600,        // 1 hour
  contentList: 1800,     // 30 minutes
  contentDetail: 3600,   // 1 hour
  staticContent: 86400,  // 24 hours
};

// Feature Flags
export const FEATURES = {
  enableLanguageSwitcher: true,
  enableAnalytics: true,
  enableSearchIndex: false,      // Set to true when search implemented
  enableComments: false,         // Set to true when comments implemented
  enableNewsletterSignup: false, // Set to true when newsletter setup
};

/**
 * Exported configuration object for convenience
 */
export const config = {
  sanity: SANITY_CONFIG,
  language: LANGUAGE_CONFIG,
  site: SITE_CONFIG,
  cache: CACHE_CONFIG,
  features: FEATURES,
};

export default config;
