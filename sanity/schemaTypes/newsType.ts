import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'



export const newsType = defineType({
  name: 'news',
  title: 'Nyheter',
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
      description: 'Primary featured image for the news article',
      options: {
        hotspot: true,
      },
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
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Category for the news article',
      options: {
        list: [
          {title: 'News', value: 'news'},
          {title: 'Release', value: 'release'},
          {title: 'Event', value: 'event'},
          {title: 'Announcement', value: 'announcement'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

  ],
})
