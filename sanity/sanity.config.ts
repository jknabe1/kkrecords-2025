import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes, structure} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'K&K RECORDS',
  studioHost: 'kkrecords',
  projectId: '44gy0hz3',
  dataset: 'production',

  plugins: [structureTool({structure})],

  schema: {
    types: schemaTypes,
  },
})