# KK Records - Multilingual Website Implementation

## Overview

KK Records now has a fully implemented multilingual system supporting **English (EN)** and **Swedish (SV)** with dynamic language switching, Sanity CMS integration, and SEO optimization.

## What's New

### ✅ Architecture

- **URL-Based Routing**: Clean language prefixes (`/en`, `/sv`)
- **Field-Level Internationalization**: Single Sanity documents with EN/SV variants
- **Middleware-Powered Language Detection**: Automatic routing to user's preferred language
- **React Context**: Efficient language state management
- **ISR + CDN Caching**: Optimized performance for content delivery

### ✅ Content Management

All content types now support multilingual fields:

| Type | Multilingual Fields |
|------|-------------------|
| **News** | Title, Slug, Excerpt, Article Content |
| **Artists** | Name, Slug, Biography |
| **Events** | Name, Slug, Special Guests, Ticket Price, Description |
| **Team** | Name, Role |
| **About** | Title, Slug, Excerpt, Main Content |

### ✅ User Interface

- **Language Switcher**: Header-integrated toggle for EN/SV switching
- **Responsive Design**: Works seamlessly on all devices
- **Accessible Navigation**: Proper ARIA labels and semantic HTML
- **Smooth Language Switching**: No page reload required

### ✅ SEO Implementation

- **hreflang Tags**: Language variants properly marked for search engines
- **Canonical URLs**: Prevents duplicate content issues
- **Metadata**: OpenGraph and Twitter cards for both languages
- **Structured Data**: Schema.org markup for rich snippets

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

The `sanity-plugin-internationalized-array` is already included in package.json.

### 2. Start Development Server

```bash
npm run dev
```

Visit:
- **English**: http://localhost:3000/en
- **Swedish**: http://localhost:3000/sv
- **Sanity Studio**: http://localhost:3000/studio

### 3. Create Multilingual Content

1. Open Sanity Studio
2. Create a news article, artist, event, or other content
3. For each field, you'll see language tabs (EN | SV)
4. Fill in both English and Swedish versions
5. Publish

### 4. View Content

- English version: http://localhost:3000/en/news
- Swedish version: http://localhost:3000/sv/nyheter

## File Structure

```
app/
├── layout.tsx                    # Root layout
├── middleware.ts                 # Language routing middleware
├── page.tsx                      # Root redirect (→ /en)
├── en/
│   └── page.tsx                 # English home redirect
└── [lang]/                       # Language-parameterized routes
    ├── layout.tsx               # Language-aware layout
    ├── page.tsx                 # Home page
    ├── artists/                 # Artist pages
    ├── events/                  # Event pages
    ├── news/                    # News pages
    ├── about/                   # About pages
    └── ...                      # Other language-specific routes

lib/
├── languages.ts                 # Language configuration
├── LanguageContext.tsx          # React Context for language state
├── sanity-i18n.ts              # Sanity i18n utilities
├── localized-content.ts         # Content extraction helpers
├── sanity-queries.ts           # Pre-built GROQ queries
├── seo-utils.ts                # SEO utilities (hreflang, canonical)
├── ui-translations.ts          # UI text translations (EN/SV)
└── config.ts                   # Global configuration

components/
├── Global/
│   └── LanguageSwitcher.tsx     # Language toggle button
└── ...                         # Other components

sanity/
├── schemaTypes/                # Updated with i18n support
│   ├── newsType.ts
│   ├── artistType.ts
│   ├── eventType.ts
│   ├── teamType.ts
│   └── aboutType.ts
└── client.ts                   # Sanity client (CDN enabled)

middleware.ts                   # Language detection & routing
