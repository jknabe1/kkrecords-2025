import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/backstage/', '/api/', '/sanity/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/backstage/', '/api/', '/sanity/'],
      },
    ],
    sitemap: 'https://kkrecords.se/sitemap.xml',
    host: 'https://kkrecords.se',
  }
}
