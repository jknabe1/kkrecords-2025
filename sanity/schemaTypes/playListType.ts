import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'
import {StarIcon} from '@sanity/icons'



export const playlist = defineType({
  name: 'playlist',
  title: 'Playlist Recommendation',
  type: 'document',
  icon: StarIcon,

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
      name: 'image',
      type: 'image',
    }),
  ],
})