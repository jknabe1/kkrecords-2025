import { defineField, defineType } from 'sanity'

/**
 * Artist Schema Type
 * Represents artists, performers, and musicians.
 * Referenced by events and other content types.
 * Supports internationalized bios (EN/SV).
 */
export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',

  fields: [
    // --- Basic Information ---
    defineField({
      name: 'name',
      type: 'internationalizedArrayString',
      title: 'Artist Name',
    }),

    defineField({
      name: 'slug',
      type: 'internationalizedArraySlug',
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
      type: 'internationalizedArrayPortableText',
      title: 'Biography',
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
