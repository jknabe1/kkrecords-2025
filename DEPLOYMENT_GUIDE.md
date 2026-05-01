# KK Records Multilingual Deployment Guide

## Quick Start

### 1. Verify the Installation

```bash
npm install  # Ensure sanity-plugin-internationalized-array is installed
```

### 2. Start the Development Server

```bash
npm run dev
```

The site is now available at:
- **English**: http://localhost:3000/en
- **Swedish**: http://localhost:3000/sv
- **Root redirect**: http://localhost:3000 (redirects to /en)

### 3. Configure Sanity

1. Go to your Sanity Studio at http://localhost:3000/studio
2. Create content with the new internationalized fields
3. For each translatable field, add both English and Swedish versions
4. Use the language toggle in Sanity to switch between languages

## Content Creation in Sanity

### Adding Multilingual Content

All these document types now support multilingual content:

- **News**: Title, Slug, Excerpt, Article Content
- **Artists**: Name, Slug, Biography
- **Events**: Name, Slug, Special Guests, Ticket Price, Short Description, Full Description
- **Team**: Name, Role
- **About**: Title, Slug, Excerpt, Main Content, Additional Content Sections

### Example: Creating a News Article

1. Navigate to Sanity Studio → Nyheter (News)
2. Click "Create new"
3. In the "Title" field, you'll see language tabs (EN | SV)
4. Click "EN" and enter English title
5. Click "SV" and enter Swedish title
6. Repeat for other multilingual fields
7. Publish

### Example: Creating an Artist

1. Navigate to Sanity Studio → Artist
2. Enter name in both languages
3. Generate slug from name (auto-filled)
4. Add biography in both languages
5. Upload image
6. Publish

## Environment Variables

Ensure these are set in your Vercel project or .env.local:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=44gy0hz3
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
```

## URL Structure

All content is organized under language prefixes:

```
/en/                        # English home
/sv/                        # Swedish home
/en/artists                 # English artists list
/sv/artists                 # Swedish artists list
/en/artists/[slug]          # English artist detail
/sv/artists/[slug]          # Swedish artist detail
/en/events                  # English events list
/sv/events                  # Swedish events list
/en/news                    # English news list
/sv/news                    # Swedish news list
/en/about                   # English about page
/sv/about                   # Swedish about page
```

## Language Switching

### Frontend Language Switcher

Located in the Header component, visible on desktop. Click the language toggle (EN/SV) to switch languages:

- Maintains current page context (e.g., from /en/artists to /sv/artists)
- Redirects to the same slug in the new language
- Smooth user experience without page reload

### User Preferences

The language preference is determined by:
1. **URL routing** (primary): /en/* or /sv/* determines the language
2. **Middleware**: Detects browser language preference and suggests appropriate language
3. **hreflang tags**: Tells search engines about language variants

## Performance Optimizations

### Caching Strategy

1. **ISR (Incremental Static Regeneration)**: Content is revalidated every 30 seconds
2. **CDN Caching**: Sanity client uses CDN for faster content delivery
3. **Query Optimization**: GROQ queries only fetch necessary fields
4. **Component Memoization**: Language context prevents unnecessary re-renders

### Query Examples

All queries use the `getLocalizedValue` helper to extract the correct language:

```typescript
// Query all artists with Swedish names
const artists = await client.fetch(`
  *[_type == "artist" && defined(slug)] {
    name,
    slug,
    image
  }
`);

// Then use getLocalizedValue to extract Swedish:
artists.map(artist => ({
  ...artist,
  name: getLocalizedValue(artist.name, 'sv', 'en')
}));
```

## SEO Implementation

### hreflang Tags

All pages include hreflang tags in the `<head>`:

```html
<link rel="alternate" hrefLang="en" href="https://kkrecords.se/en/artists" />
<link rel="alternate" hrefLang="sv" href="https://kkrecords.se/sv/artists" />
<link rel="alternate" hrefLang="x-default" href="https://kkrecords.se/en" />
```

### Canonical URLs

Each page has a canonical URL pointing to the language-specific version to prevent duplicate content issues.

### Metadata

OpenGraph and Twitter metadata are automatically generated for each language variant.

## Troubleshooting

### Issue: Internationalized fields not showing

**Solution**: 
1. Verify the sanity-plugin-internationalized-array is installed: `npm list sanity-plugin-internationalized-array`
2. Restart Sanity Studio and clear browser cache
3. Check sanity.config.ts includes the plugin configuration

### Issue: Language switching not working

**Solution**:
1. Verify middleware.ts is in the root directory
2. Check that both /en and /sv routes exist
3. Test middleware with console logs in /lib/sanity-i18n.ts

### Issue: Translated content not appearing

**Solution**:
1. Verify content has entries for both EN and SV in Sanity
2. Check GROQ queries are being executed: add console.log to page.tsx
3. Verify getLocalizedValue is correctly extracting the language

## Monitoring & Maintenance

### Regular Tasks

1. **Content Sync**: Ensure new content is added in both languages
2. **SEO Monitoring**: Check Search Console for language variant issues
3. **Performance**: Monitor Core Web Vitals for both language versions
4. **User Analytics**: Track language preference to understand audience

### Content Checklist

Before publishing content, verify:
- [ ] English version is complete
- [ ] Swedish version is complete
- [ ] URLs/slugs are language-appropriate
- [ ] Images have alt text (same for both languages)
- [ ] Links point to correct language version
- [ ] Metadata is filled in for both languages

## Technical Architecture

### Core Components

1. **Middleware** (`middleware.ts`): Routes requests to correct language
2. **Language Context** (`lib/LanguageContext.tsx`): Manages language state
3. **Language Switcher** (`components/Global/LanguageSwitcher.tsx`): UI for switching
4. **Sanity Queries** (`lib/sanity-queries.ts`): Pre-built GROQ queries for content
5. **Localized Content Helper** (`lib/localized-content.ts`): Extracts language variants

### Data Flow

```
User visits /en/artists
    ↓
Middleware validates language
    ↓
Page component receives {lang: 'en'}
    ↓
GROQ query fetches content with internationalized fields
    ↓
getLocalizedValue extracts 'en' variants
    ↓
Component renders with English content
    ↓
hreflang tags added for SEO
```

## Scaling to More Languages

To add more languages (e.g., German):

1. Update `sanity.config.ts`:
```typescript
languages: [
  { id: 'en', title: 'English' },
  { id: 'sv', title: 'Swedish' },
  { id: 'de', title: 'Deutsch' },
],
```

2. Update `lib/languages.ts`:
```typescript
export const LANGUAGES = {
  en: 'English',
  sv: 'Svenska',
  de: 'Deutsch',
} as const;
```

3. Update middleware, routes, and components to support new language code

## Support & Resources

- **Sanity Docs**: https://www.sanity.io/docs/
- **Internationalized Array Plugin**: https://github.com/sanity-io/sanity-plugin-internationalized-array
- **Next.js Internationalization**: https://nextjs.org/docs/app/building-your-application/routing/internationalization-routing

## Contact

For issues or questions about the multilingual implementation, refer to the IMPLEMENTATION_SUMMARY.md and TESTING_CHECKLIST.md files.
