'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: '44gy0hz3',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schemaTypes,
  plugins: [
    internationalizedArray({
      languages: [
        { id: 'en', title: 'English' },
        { id: 'sv', title: 'Swedish' },
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text', 'slug'],
    }),
  ],
})
