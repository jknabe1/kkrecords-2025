import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'
import { DoorsOpenInput } from './components/DoorsOpenInput'

/**
 * Event Schema Type
 * Represents events (concerts, festivals, workshops, etc.)
 * with support for in-person, virtual, and hybrid events.
 */
export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,

  groups: [
    { name: 'details', title: 'Details' },
    { name: 'editorial', title: 'Editorial' },
  ],

  fields: [
    // --- Basic Information ---
    defineField({
      name: 'name',
      type: 'string',
      title: 'Event Name',
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
      title: 'Featured Event',
      description: 'Show this event prominently on the homepage',
      initialValue: false,
      group: 'details',
    }),

    // --- Date & Time ---
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Start Date/Time',
      group: 'details',
    }),

    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End Date/Time',
      description: 'When the event ends (optional)',
      group: 'details',
    }),

    defineField({
      name: 'doorsOpen',
      type: 'number',
      title: 'Doors Open',
      description: 'Number of minutes before the start time for admission',
      initialValue: 60,
      group: 'details',
      components: {
        input: DoorsOpenInput,
      },
    }),

    // --- Event Details ---
    defineField({
      name: 'eventType',
      type: 'string',
      title: 'Event Type',
      options: {
        list: ['in-person', 'virtual', 'hybrid'],
        layout: 'radio',
      },
      group: 'details',
    }),

    defineField({
      name: 'eventCategory',
      type: 'string',
      title: 'Event Category',
      options: {
        list: [
          { title: 'Concert', value: 'concert' },
          { title: 'Festival', value: 'festival' },
          { title: 'Club Night', value: 'club-night' },
          { title: 'Private Event', value: 'private' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Other', value: 'other' },
        ],
      },
      group: 'details',
    }),

    defineField({
      name: 'ageRestriction',
      type: 'string',
      title: 'Age Restriction',
      description: 'Minimum age requirement for the event',
      options: {
        list: [
          { title: 'All Ages', value: 'all-ages' },
          { title: '18+', value: '18+' },
          { title: '21+', value: '21+' },
          { title: 'Family Friendly', value: 'family' },
        ],
      },
      group: 'details',
    }),

    // --- Venue & Location ---
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{ type: 'venue' }],
      title: 'Venue',
      readOnly: ({ value, document }) =>
        !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }
          return true
        }),
      group: 'details',
    }),

    // --- Lineup ---
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{ type: 'artist' }],
      title: 'Headline Artist',
      group: 'details',
    }),

    defineField({
      name: 'lineup',
      type: 'array',
      title: 'Additional Lineup',
      description: 'Other performers besides the headline artist',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artist' }],
        },
      ],
      group: 'details',
    }),

    defineField({
      name: 'specialGuests',
      type: 'string',
      title: 'Special Guests',
      description: 'Additional guest performers or DJs (as text)',
      group: 'details',
    }),

    // --- Ticketing ---
    defineField({
      name: 'tickets',
      type: 'url',
      title: 'Ticket Link',
      description: 'URL to purchase tickets',
      group: 'details',
    }),

    defineField({
      name: 'ticketPrice',
      type: 'string',
      title: 'Ticket Price',
      description: 'Price range or specific price (e.g., "150 SEK" or "Free")',
      group: 'details',
    }),

    // --- Editorial Content ---
    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Event Image',
      description: 'Primary featured image for the event',
      options: {
        hotspot: true,
      },
      group: 'editorial',
    }),

    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Event Gallery',
      description: 'Additional images for the event (optional)',
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
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      group: 'editorial',
    }),

    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'A brief overview of the event (used in listings and SEO)',
      rows: 3,
      validation: (rule) =>
        rule
          .max(300)
          .warning('Keep short descriptions under 300 characters'),
      group: 'editorial',
    }),

    defineField({
      name: 'details',
      type: 'array',
      title: 'Full Description',
      description: 'Detailed event information',
      of: [{ type: 'block' }],
      group: 'editorial',
    }),
  ],

  preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({ name, venue, artist, date, image }) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date'

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})

