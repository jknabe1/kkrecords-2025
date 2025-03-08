import {defineField, defineType} from 'sanity'
import {BulbFilledIcon} from '@sanity/icons'



export const video = defineType({
  name: 'video',
  title: 'Video Recommendation',
  type: 'document',
  icon: BulbFilledIcon,

  fields: [
    defineField({
      name: 'name',
      type: 'string',
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
        name: 'creator',
        type: 'string',
      }),
    defineField({
      name: 'excerpt',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})