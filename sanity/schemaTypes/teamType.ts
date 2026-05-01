import {defineField, defineType} from 'sanity'
import {OkHandIcon} from '@sanity/icons'

/**
 * Team Schema Type
 * Represents team members with multilingual support.
 */
export const teamType = defineType({
  name: 'team',
  title: 'Medarbetare',
  type: 'document',
  icon: OkHandIcon,

  fields: [
    defineField({
      name: 'name',
      type: 'internationalizedArrayString',
      title: 'Name',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'roll',
      type: 'internationalizedArrayString',
      title: 'Role',
    }),
  ],
})
