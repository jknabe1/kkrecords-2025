/**
 * GROQ Query Builders for Internationalized Content
 * Provides utilities to fetch localized content from Sanity
 */

/**
 * Base query fragment for fetching internationalized fields
 * Useful for selecting language-specific content efficiently
 */
export const INTERNATIONALIZED_FIELDS_FRAGMENT = `
  name,
  slug,
  excerpt,
  description,
  shortDescription
`;

/**
 * Query to fetch all artists with full localized data
 */
export const ALL_ARTISTS_QUERY = `*[_type == "artist" && defined(slug)] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  Biography,
  image {
    _type,
    asset -> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    hotspot,
    crop
  }
} | order(name[0].value asc)`;

/**
 * Query to fetch a single artist by slug (language-specific)
 */
export function getArtistBySlugQuery(slug: string): string {
  return `*[_type == "artist" && slug[]._key == "${slug}"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    name,
    slug,
    Biography,
    image {
      _type,
      asset -> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    }
  }`;
}

/**
 * Query to fetch all news/articles with localized data
 */
export const ALL_NEWS_QUERY = `*[_type == "news" && defined(slug)] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  excerpt,
  details,
  image {
    _type,
    asset -> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    hotspot,
    crop
  },
  publishedAt
} | order(publishedAt desc)`;

/**
 * Query to fetch a single news article by slug
 */
export function getNewsBySlugQuery(slug: string): string {
  return `*[_type == "news" && slug[]._key == "${slug}"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    name,
    slug,
    excerpt,
    details,
    image {
      _type,
      asset -> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    publishedAt
  }`;
}

/**
 * Query to fetch all events with localized data
 */
export const ALL_EVENTS_QUERY = `*[_type == "event" && defined(slug)] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  shortDescription,
  details,
  ticketPrice,
  tickets,
  specialGuests,
  image {
    _type,
    asset -> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    hotspot,
    crop
  },
  gallery[] {
    _type,
    asset -> {
      _id,
      url
    },
    hotspot,
    crop
  },
  startDate,
  endDate,
  venue,
  location
} | order(startDate desc)`;

/**
 * Query to fetch a single event by slug
 */
export function getEventBySlugQuery(slug: string): string {
  return `*[_type == "event" && slug[]._key == "${slug}"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    name,
    slug,
    shortDescription,
    details,
    ticketPrice,
    tickets,
    specialGuests,
    image {
      _type,
      asset -> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    gallery[] {
      _type,
      asset -> {
        _id,
        url
      },
      hotspot,
      crop
    },
    startDate,
    endDate,
    venue,
    location,
    "artists": *[_type=="artist" && references(^._id)]{
      _id,
      name,
      slug,
      image
    }
  }`;
}

/**
 * Query to fetch all team members with localized data
 */
export const ALL_TEAM_MEMBERS_QUERY = `*[_type == "team"] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  roll,
  email,
  image {
    _type,
    asset -> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    hotspot,
    crop
  }
} | order(name[0].value asc)`;

/**
 * Query to fetch the About page content
 */
export const ABOUT_PAGE_QUERY = `*[_type == "about"][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  excerpt,
  details,
  additionalContent,
  image {
    _type,
    asset -> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    hotspot,
    crop
  },
  gallery[] {
    _type,
    asset -> {
      _id,
      url
    },
    hotspot,
    crop
  }
}`;

/**
 * Query helper for featured/recent content
 */
export function getFeaturedContentQuery(type: string, limit: number = 3): string {
  return `*[_type == "${type}" && defined(slug)] {
    _id,
    name,
    slug,
    excerpt,
    image,
    publishedAt
  } | order(publishedAt desc)[0...${limit}]`;
}
