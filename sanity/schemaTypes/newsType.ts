import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

/**
 * News Schema Type
 * Represents news articles, releases, and announcements.
 * Includes featured content, categories, and tagging system.
 */
export const newsType = defineType({
  name: 'news',
  title: 'Nyheter',
  type: 'document',
  icon: BookIcon,

  groups: [
    { name: 'details', title: 'Details' },
    { name: 'editorial', title: 'Editorial' },
  ],

  fields: [
    // --- Basic Information ---
    defineField({
      name: 'name',
      type: 'string',
      title: 'Title',
      group: 'details',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
      group: 'details',
      validation: (rule) =>
        rule
          .required()
          .error('Required to generate a page on the website'),
    }),

    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Check this if the news item should be featured',
      initialValue: false,
      group: 'details',
    }),

    // --- Publication ---
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      group: 'details',
      validation: (rule) =>
        rule
          .required()
          .error('Required to generate a page on the website'),
    }),

    // --- Categorization ---
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Category for the news article',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Release', value: 'release' },
          { title: 'Event', value: 'event' },
          { title: 'Announcement', value: 'announcement' },
        ],
      },
      group: 'details',
    }),

    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Keywords and tags for filtering',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'details',
    }),

    // --- Editorial Content ---
    defineField({
      name: 'excerpt',
      type: 'string',
      title: 'Excerpt',
      description: 'Short summary of the news item',
      group: 'editorial',
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Image',
      description: 'Primary featured image for the news article',
      options: {
        hotspot: true,
      },
      group: 'editorial',
    }),

    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Image Gallery',
      description: 'Additional images for the article (optional)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Description for accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
      group: 'editorial',
    }),

    defineField({
      name: 'details',
      type: 'array',
      title: 'Article Content',
      of: [{ type: 'block' }],
      group: 'editorial',
    }),
  ],
})

