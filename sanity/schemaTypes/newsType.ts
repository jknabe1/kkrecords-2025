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
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),

  ],
})