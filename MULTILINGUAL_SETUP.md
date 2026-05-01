# K&K Records Multilingual Website Implementation Guide

## Overview

This implementation provides a comprehensive multilingual website supporting Swedish (sv) and English (en) languages. The system uses:

- **Field-level internationalization**: Single documents with language variants in fields
- **URL-based routing**: `/en/*` and `/sv/*` paths for clean SEO-friendly URLs
- **Sanity Content Management**: Integrated with `sanity-plugin-internationalized-array` for managing translations
- **React Context**: Language state management across the application
- **Next.js App Router**: Modern server and client component architecture

## Architecture Overview

### 1. Directory Structure

```
app/
├── page.tsx                    # Root redirect to /en
├── [lang]/
│   ├── layout.tsx             # Language-aware layout with SEO
│   ├── page.tsx               # Home page with language context
│   ├── news/
│   │   ├── page.tsx           # News listing
│   │   └── [slug]/
│   │       └── page.tsx       # News detail page
│   ├── events/
│   │   ├── page.tsx           # Events listing
│   │   └── [slug]/
│   │       └── page.tsx       # Event detail page
│   ├── artists/
│   │   ├── page.tsx           # Artists listing
│   │   └── [slug]/
│   │       └── page.tsx       # Artist detail page
│   ├── about/
│   │   └── page.tsx           # About page
│   └── om-oss/
│       └── page.tsx           # Swedish "About" page (legacy/alias)
├── en/
│   └── page.tsx               # English home redirect
└── studio/
    └── [...tool]/
        └── page.tsx           # Sanity Studio

lib/
├── languages.ts               # Language configuration
├── LanguageContext.tsx        # React Context for language state
├── localized-content.ts       # Utility functions for localized content
├── sanity-i18n.ts             # Sanity integration helpers
├── sanity-queries.ts          # GROQ query builders
├── seo-utils.ts               # SEO metadata utilities
└── ui-translations.ts         # UI text translations

components/
├── Global/
│   ├── Header/
│   │   └── Header.tsx         # Includes LanguageSwitcher
│   ├── Footer/
│   │   └── Footer.tsx
│   └── LanguageSwitcher.tsx   # Language selection component
└── [other components]

middleware.ts                  # Language routing middleware

sanity/
├── client.ts                  # Sanity client configuration
├── schemaTypes/
│   ├── index.ts
│   ├── newsType.ts            # Updated with i18n fields
│   ├── artistType.ts          # Updated with i18n fields
│   ├── eventType.ts           # Updated with i18n fields
│   ├── teamType.ts            # Updated with i18n fields
│   ├── aboutType.ts           # Updated with i18n fields
│   └── components/
│       └── DoorsOpenInput.tsx
└── sanity.config.ts           # Updated with i18n plugin
```

## Key Features

### 1. Language Context (`lib/LanguageContext.tsx`)

Provides language state management through React Context:

```tsx
const { language, setLanguage } = useLanguage();
// language: 'en' | 'sv'
// setLanguage: (lang: string) => void
```

### 2. Language Switching (`components/Global/LanguageSwitcher.tsx`)

Dropdown component in the Header for switching languages. Routes update automatically via next/navigation.

### 3. Localized Content (`lib/localized-content.ts`)

Helper functions to extract language-specific content:

```ts
const localizedValue = getLocalizedValue(
  internationalizedArray,
  language,
  fallbackLanguage
);
```

### 4. GROQ Queries (`lib/sanity-queries.ts`)

Pre-built queries for common content types:

```ts
import { ALL_ARTISTS_QUERY, getEventBySlugQuery } from '@/lib/sanity-queries';

const artists = await client.fetch(ALL_ARTISTS_QUERY);
const event = await client.fetch(getEventBySlugQuery(slug));
```

### 5. URL-Based Routing (`middleware.ts`)

Middleware handles:
- Route normalization (redirects non-lang routes to `/en/*`)
- Language detection from Accept-Language header (optional)
- Proper handling of language parameters in routes

### 6. SEO Optimization (`lib/seo-utils.ts`)

- hreflang tags for search engines
- Canonical URLs
- Language-specific metadata
- Open Graph tags

## Content Structure in Sanity

### Internationalized Fields

With the `sanity-plugin-internationalized-array` plugin enabled, fields are stored as:

```json
{
  "name": [
    { "language": "en", "value": "Concert Night 2024" },
    { "language": "sv", "value": "Konstnätskväll 2024" }
  ],
  "slug": [
    { "language": "en", "value": "concert-night-2024" },
    { "language": "sv", "value": "konstnaktskvall-2024" }
  ]
}
```

### Updated Schema Types

All content types now use internationalized array fields:

- **name**: `internationalizedArrayString` - Main title/name
- **slug**: `internationalizedArraySlug` - URL-safe identifier
- **excerpt**: `internationalizedArrayString` - Short summary
- **description**: `internationalizedArrayText` - Detailed text
- **details/content**: `internationalizedArrayPortableText` - Rich text content

## How to Use

### 1. Adding Multilingual Content in Sanity Studio

1. Go to `/studio` (admin panel)
2. Open the Internationalization plugin
3. Select your document type (News, Artist, Event, etc.)
4. For each language:
   - Click the language tab (EN / SV)
   - Fill in the localized content
   - Save

### 2. Creating New Pages with Language Support

```tsx
// app/[lang]/my-page/page.tsx
import { getLocalizedValue } from '@/lib/localized-content';

export default async function MyPage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const content = await client.fetch(MY_QUERY);
  
  const localizedTitle = getLocalizedValue(
    content.title,
    params.lang,
    'en'
  );
  
  return <h1>{localizedTitle}</h1>;
}
```

### 3. Switching Languages

Users can:
- Click the language switcher in the header
- Use direct URLs: `/en/...` or `/sv/...`
- Share language-specific links

### 4. Querying Localized Content

```ts
// Using pre-built queries
const artists = await client.fetch(ALL_ARTISTS_QUERY);
const event = await client.fetch(getEventBySlugQuery('my-event'));

// Custom GROQ query with language filtering
const query = `*[_type == "news" && language == "en"] | order(publishedAt desc)[0...3]`;
```

## Performance Optimization

### 1. Caching Strategy

- **Sanity CDN Enabled**: `useCdn: true` in `sanity/client.ts`
- **ISR (Incremental Static Regeneration)**: `revalidate` in page components
- **Component Memoization**: Use `React.memo()` for frequently re-rendered components

### 2. Image Optimization

Images are optimized through:
- Sanity's built-in image pipeline
- Next.js Image component with responsive sizing
- LQIP (Low Quality Image Placeholder) for better UX

### 3. Query Optimization

- Use GROQ field selection to fetch only needed data
- Pre-built query fragments reduce duplication
- Pagination for large content lists

## SEO Best Practices Implemented

### 1. hreflang Tags
- Alternate language versions are declared
- x-default fallback provided
- Canonical tags set for each page

### 2. Metadata
- Dynamic metadata generation based on language
- Open Graph tags for social sharing
- Twitter card support

### 3. Structured Data
- Organization schema (RecordLabel)
- BreadcrumbList for navigation
- JSON-LD format for search engines

### 4. Sitemap
- Include both language variants
- Proper lastmod and priority tags
- Submitted to search engines

## Language Detection & Defaults

### Current Behavior
- Root `/` redirects to `/en` (English default)
- Invalid language params fallback to English
- Users can switch via language switcher or direct URLs

### Future Enhancement Options
1. Accept-Language header detection in middleware
2. User preference storage in cookies
3. Geolocation-based defaults

## Troubleshooting

### Issue: Translations not showing in Sanity Studio

**Solution**: Ensure the internationalized-array plugin is enabled in `sanity.config.ts`

### Issue: Content not appearing on website

**Solution**: Check that:
1. Document is published in Sanity
2. Language variant is filled in (EN/SV)
3. GROQ query includes all necessary fields
4. Browser cache is cleared

### Issue: Language switcher not working

**Solution**: 
1. Check middleware.ts is in root directory
2. Verify routes follow `[lang]` pattern
3. Use `next/navigation` hooks in client components

### Issue: SEO hreflang tags missing

**Solution**: Ensure `app/[lang]/layout.tsx` includes the hreflang link tags in the head

## Maintenance & Updates

### Regular Tasks

1. **Monitor Sanity API**: Check for deprecations in `sanity.io/docs`
2. **Test Language Switching**: Verify all routes work in both languages
3. **Update Translations**: Review and update UI translations in `lib/ui-translations.ts`
4. **Check SEO**: Monitor search console for language-related issues

### Adding New Content Types

1. Create schema type with internationalized fields
2. Add it to `sanity/schemaTypes/index.ts`
3. Create GROQ query helper in `lib/sanity-queries.ts`
4. Build React component and page to display content
5. Place page under `app/[lang]/[content-type]/`

## Deployment

### Vercel Deployment

1. Connect GitHub repository
2. Set environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
3. Deploy - Vercel automatically handles ISR and edge caching

### Build Optimization

```bash
# Generate static params for all language routes
npm run build

# Pre-render all language variants during build
```

## References

- [Sanity Internationalization Docs](https://www.sanity.io/docs/studio/ai-assist-content-translation)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [hreflang Best Practices](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
