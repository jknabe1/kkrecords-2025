'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { LANGUAGE_LABELS, getAlternativeLanguage, Language } from '@/lib/languages';

/**
 * Language Switcher Component
 * Allows users to toggle between EN and SV languages
 * Updates the URL to reflect the language change
 */
export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();

  const handleLanguageChange = (newLang: Language) => {
    // Replace current language in pathname with new language
    // Pathname format: /[lang]/... or /[lang]
    const segments = pathname.split('/').filter(Boolean);
    
    if (segments.length === 0) {
      // Root path
      router.push(`/${newLang}`);
      return;
    }

    // Check if first segment is a language
    const firstSegment = segments[0];
    if (firstSegment === 'en' || firstSegment === 'sv') {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }

    router.push(`/${segments.join('/')}`);
  };

  const alternativeLanguage = getAlternativeLanguage(language);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-2 rounded-md font-medium transition-colors ${
          language === 'en'
            ? 'bg-foreground text-background'
            : 'hover:bg-muted text-muted-foreground'
        }`}
        aria-current={language === 'en' ? 'page' : undefined}
      >
        {LANGUAGE_LABELS.en}
      </button>
      <button
        onClick={() => handleLanguageChange('sv')}
        className={`px-3 py-2 rounded-md font-medium transition-colors ${
          language === 'sv'
            ? 'bg-foreground text-background'
            : 'hover:bg-muted text-muted-foreground'
        }`}
        aria-current={language === 'sv' ? 'page' : undefined}
      >
        {LANGUAGE_LABELS.sv}
      </button>
    </div>
  );
}
