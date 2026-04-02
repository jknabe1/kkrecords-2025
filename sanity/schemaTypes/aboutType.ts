import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'



export const aboutType = defineType({
  name: 'about',
  title: 'Om oss',
  type: 'document',
  icon: BookIcon,

  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],

  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      validation: (rule) => rule
      .required()
      .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule
      .required()
      .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Check this if the news item should be featured',
    }),
    defineField({
      name: 'excerpt',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Image',
      description: 'Primary featured image',
      options: {
        hotspot: true,
      },
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
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
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
              of: [{type: 'block'}],
            },
          ],
        },
      ],
    }),

  ],
})
