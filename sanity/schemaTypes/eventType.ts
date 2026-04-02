import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import {DoorsOpenInput} from './components/DoorsOpenInput'



export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,

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
      name: 'date',
      type: 'datetime',
    }),
    defineField({
      name: 'doorsOpen',
      description: 'Number of minutes before the start time for admission',
      type: 'number',
      initialValue: 60,
      components: {
        input: DoorsOpenInput
      },
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
      rule.custom((value, context) => {
      if (value && context?.document?.eventType === 'virtual') {
        return 'Only in-person events can have a venue'
      }

      return true
    }),
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Event Image',
      description: 'Primary featured image for the event',
      options: {
        hotspot: true,
      },
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
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'A brief overview of the event (used in listings and SEO)',
      rows: 3,
      validation: (rule) => rule.max(300).warning('Keep short descriptions under 300 characters'),
    }),
    defineField({
      name: 'details',
      type: 'array',
      title: 'Full Description',
      description: 'Detailed event information',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      title: 'Event Type',
      options: {
        list: ['in-person', 'virtual', 'hybrid'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'eventCategory',
      type: 'string',
      title: 'Event Category',
      options: {
        list: [
          {title: 'Concert', value: 'concert'},
          {title: 'Festival', value: 'festival'},
          {title: 'Club Night', value: 'club-night'},
          {title: 'Private Event', value: 'private'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'ageRestriction',
      type: 'string',
      title: 'Age Restriction',
      description: 'Minimum age requirement for the event',
      options: {
        list: [
          {title: 'All Ages', value: 'all-ages'},
          {title: '18+', value: '18+'},
          {title: '21+', value: '21+'},
          {title: 'Family Friendly', value: 'family'},
        ],
      },
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      title: 'Ticket Link',
      description: 'URL to purchase tickets',
    }),
    defineField({
      name: 'ticketPrice',
      type: 'string',
      title: 'Ticket Price',
      description: 'Price range or specific price (e.g., "150 SEK" or "Free")',
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End Date/Time',
      description: 'When the event ends (optional)',
    }),
    defineField({
      name: 'lineup',
      type: 'array',
      title: 'Additional Lineup',
      description: 'Other performers besides the headline artist',
      of: [
        {
          type: 'reference',
          to: [{type: 'artist'}],
        },
      ],
    }),
    defineField({
      name: 'specialGuests',
      type: 'string',
      title: 'Special Guests',
      description: 'Additional guest performers or DJs (as text)',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Event',
      description: 'Show this event prominently on the homepage',
      initialValue: false,
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
  prepare({name, venue, artist, date, image}) {
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
