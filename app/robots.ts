import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/backstage/'],
      },
    ],
    sitemap: 'https://kkrecords.se/sitemap.xml',
  }
}
