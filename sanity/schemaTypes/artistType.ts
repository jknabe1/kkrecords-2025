import { defineField, defineType } from 'sanity'

/**
 * Artist Schema Type
 * Represents artists, performers, and musicians.
 * Referenced by events and other content types.
 */
export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',

  fields: [
    // --- Basic Information ---
    defineField({
      name: 'name',
      type: 'string',
      title: 'Artist Name',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
      validation: (rule) =>
        rule
          .required()
          .error('Required to generate a page on the website'),
    }),

    // --- Media ---
    defineField({
      name: 'image',
      type: 'image',
      title: 'Artist Image',
      options: {
        hotspot: true,
      },
    }),

    // --- Content ---
    defineField({
      name: 'Biography',
      type: 'array',
      title: 'Biography',
      of: [{ type: 'block' }],
    }),

    // --- Social Links ---
    defineField({
      name: 'Facebook',
      type: 'url',
      title: 'Facebook',
    }),

    defineField({
      name: 'Instagram',
      type: 'url',
      title: 'Instagram',
    }),

    defineField({
      name: 'spotify',
      type: 'url',
      title: 'Spotify',
    }),

    // --- Relations ---
    defineField({
      name: 'Events',
      type: 'reference',
      title: 'Events',
      to: [{ type: 'event' }],
    }),
  ],
})


