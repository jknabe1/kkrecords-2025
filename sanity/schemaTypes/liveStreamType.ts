import {defineField, defineType} from 'sanity'
import {DatabaseIcon} from '@sanity/icons'



export const liveStreamType = defineType({
  name: 'data',
  title: 'data',
  type: 'document',
  icon: DatabaseIcon,

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
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule
      .required()
      .error(`Required to generate a page on the website`),
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
    {
        "title": "Video blog post",
        "name": "videoBlogPost",
        "type": "document",
        "fields": [
          { "title": "Title", "name": "title", "type": "string" },
          {
            "title": "Video file",
            "name": "video",
            "type": "mux.video"
          }
        ]
      }
  ],
})