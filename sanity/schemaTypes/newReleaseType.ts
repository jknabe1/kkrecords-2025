import { defineField, defineType } from "sanity"

export const newRelease = defineType({
  name: "newRelease",
  title: "New Release",
  type: "document",
  fields: [
    defineField({
      name: "artist",
      title: "Artist",
      type: "reference",
      to: [{ type: "artist" }], // Changed from "artistType" to "artist"
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "releaseName",
      title: "Release Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "releaseDescription",
      title: "Release Block content",
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'Streaming Link',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "releaseName",
      artistName: "artist.name",
      media: "image",
    },
    prepare({ title, artistName, media }) {
      return {
        title,
        subtitle: artistName,
        media,
      };
    },
  },
})