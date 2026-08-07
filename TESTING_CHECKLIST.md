# Multilingual Implementation - Testing Checklist

## Pre-Launch Testing

### Language Switching
- [ ] Click EN button in header - URL changes to `/en/...`
- [ ] Click SV button in header - URL changes to `/sv/...`
- [ ] Language persists across page navigation
- [ ] Language switcher visible on all pages
- [ ] Language buttons show correct active state

### Routing & Navigation
- [ ] `/` redirects to `/en`
- [ ] `/en/artists` loads English artist listing
- [ ] `/sv/artister` (or equivalent) loads Swedish version
- [ ] Invalid lang params fallback gracefully
- [ ] All existing routes work with language prefix
- [ ] Direct `/en/*` and `/sv/*` URLs load correctly

### Content Display
- [ ] News articles show in selected language
- [ ] Artist bios display localized content
- [ ] Event descriptions appear in correct language
- [ ] About page content switches languages
- [ ] Team member information translates properly
- [ ] No untranslated content visible on page

### Sanity Studio Integration
- [ ] Internationalized Array plugin visible in Studio
- [ ] Language tabs (EN/SV) appear for all fields
- [ ] Can edit content for each language separately
- [ ] Slug generation works for both languages
- [ ] Changes publish correctly to both variants
- [ ] Content appears on website after publish

### SEO & Metadata
- [ ] Meta title changes with language
- [ ] Meta description translates properly
- [ ] Open Graph tags show language-specific content
- [ ] hreflang link tags present in source
- [ ] Canonical URLs point to correct language variant
- [ ] x-default hreflang included
- [ ] Robot meta tags allow indexing

### Performance
- [ ] Page loads in < 3 seconds with CDN
- [ ] Images load with LQIP placeholders
- [ ] No console errors or warnings
- [ ] Cache headers present in network requests
- [ ] ISR revalidation triggers on content update
- [ ] No API calls for cached content

### Accessibility
- [ ] Language switcher keyboard navigable
- [ ] ARIA labels present on buttons
- [ ] Page lang attribute correct (lang="en" / lang="sv")
- [ ] Focus indicators visible
- [ ] Screen reader announces language selection
- [ ] Semantic HTML structure maintained

### Mobile Responsiveness
- [ ] Header and language switcher display on mobile
- [ ] Language toggle buttons touch-friendly
- [ ] All pages responsive at mobile sizes
- [ ] Navigation works on tablet & phone
- [ ] No horizontal scrolling issues
- [ ] Images responsive on all device sizes

### Browser Compatibility
- [ ] Chrome/Chromium latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Error Handling
- [ ] 404 page shows in correct language
- [ ] Error messages display localized text
- [ ] Fallback language works if content missing
- [ ] Invalid routes handle gracefully
- [ ] Network errors don't break layout

## Content Verification

### Check Each Content Type
- [ ] News articles fully translated
- [ ] Artist profiles have EN/SV versions
- [ ] Events show in both languages
- [ ] Team member bios translated
- [ ] About page complete in both languages
- [ ] No placeholder or missing text

### URL Structure
- [ ] English articles at `/en/news/article-slug`
- [ ] Swedish articles at `/sv/nyheter/artikel-slug`
- [ ] Slugs are language-specific where needed
- [ ] Breadcrumbs use correct language
- [ ] Navigation links use correct language

## Analytics & Monitoring

### Setup Checks
- [ ] Google Analytics tracking both languages
- [ ] Language dimension tracked in analytics
- [ ] Conversion tracking per language configured
- [ ] Search Console set up for both variants
- [ ] Sitemap includes all language versions
- [ ] Robots.txt allows both language variants

### Initial Metrics to Monitor
- [ ] Pageviews per language
- [ ] Bounce rate by language
- [ ] Conversion rate by language
- [ ] Time on page by language
- [ ] Search impressions by language
- [ ] Click-through rate by language

## Post-Launch Monitoring

### Daily Checks (First Week)
- [ ] No 404 errors for language routes
- [ ] Hreflang errors in Search Console
- [ ] crawl stats normal in Search Console
- [ ] No unusual traffic patterns
- [ ] Error rates normal

### Weekly Checks (First Month)
- [ ] Organic traffic from both language versions
- [ ] User engagement balanced across languages
- [ ] No duplicate content warnings
- [ ] Search rankings for key terms
- [ ] Content update testing in both languages

### Monthly Checks
- [ ] Language distribution of users
- [ ] Performance metrics by language
- [ ] Content quality metrics
- [ ] User feedback/behavior
- [ ] Competitor language strategies

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Language not switching | Check middleware.ts is in root, verify route structure |
| Untranslated content shows | Ensure all fields filled in Sanity for both languages |
| hreflang missing | Verify app/[lang]/layout.tsx includes link tags |
| 404 on language routes | Check next.config.js, ensure [lang] in route structure |
| Images not showing | Verify Sanity CDN enabled, check image URLs in queries |
| Slow page loads | Check ISR revalidate intervals, monitor API calls |
| Language switcher not visible | Verify Header.tsx imports LanguageSwitcher component |

## Sign-Off Checklist

**Tested By**: _________________ **Date**: _____________

- [ ] All language switching works
- [ ] All content displays in correct language
- [ ] SEO tags properly configured
- [ ] Performance meets standards
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Accessible to screen readers
- [ ] Ready for launch

**Notes**:
```
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________
```

**Approver**: _________________ **Date**: _____________
