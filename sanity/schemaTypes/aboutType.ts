import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

/**
 * About Schema Type
 * Represents "About Us" and similar informational pages.
 * Similar to news but designed for company/organization information.
 */
export const aboutType = defineType({
  name: 'about',
  title: 'Om oss',
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
      description: 'Check this if the page should be featured',
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

    // --- Editorial Content ---
    defineField({
      name: 'excerpt',
      type: 'string',
      title: 'Excerpt',
      description: 'Short summary of the page content',
      group: 'editorial',
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Image',
      description: 'Primary featured image',
      options: {
        hotspot: true,
      },
      group: 'editorial',
    }),

    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Image Gallery',
      description: 'Additional images for the about page (optional)',
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
      title: 'Main Content',
      of: [{ type: 'block' }],
      group: 'editorial',
    }),

    defineField({
      name: 'additionalContent',
      type: 'array',
      title: 'Additional Content Sections',
      description: 'Add more content sections with titles',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          fields: [
            {
              name: 'sectionTitle',
              type: 'string',
              title: 'Section Title',
            },
            {
              name: 'sectionContent',
              type: 'array',
              title: 'Section Content',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
      group: 'editorial',
    }),
  ],
})

