// ============================================================================
// Sanity Schema Types Index
// ============================================================================

// --- Document Types ---
import {eventType} from './eventType'
import {newsType} from './newsType'
import {aboutType} from './aboutType'
import {newRelease} from './newReleaseType'

// --- Reference Types ---
import {artistType} from './artistType'
import {venueType} from './venueType'
import {teamType} from './teamType'
import {sponsorType} from './sponsorType'

// --- Media & Content Types ---
import {playlist} from './playListType'

// --- Data/Utility Types ---
import {dataType} from './dataType'

// --- Icons ---
import {
  CalendarIcon,
  DocumentTextIcon,
  InfoOutlineIcon,
  AddCircleIcon,
  UsersIcon,
  PinIcon,
  UserIcon,
  HeartIcon,
  DatabaseIcon,
  CircleIcon,
} from '@sanity/icons'

import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('K&K Records')
    .items([

      // ── Content ───────────────────────────────────────────────────────────
      S.listItem()
        .title('Content')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('Events')
                .icon(CalendarIcon)
                .child(S.documentTypeList(eventType.name).title('Events')),

              S.listItem()
                .title('News')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList(newsType.name).title('News')),

              S.listItem()
                .title('About')
                .icon(InfoOutlineIcon)
                .child(S.documentTypeList(aboutType.name).title('About')),

              S.listItem()
                .title('New Releases')
                .icon(AddCircleIcon)
                .child(S.documentTypeList(newRelease.name).title('New Releases')),
            ]),
        ),

      S.divider(),

      // ── People & Places ───────────────────────────────────────────────────
      S.listItem()
        .title('People & Places')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('People & Places')
            .items([
              S.listItem()
                .title('Artists')
                .icon(UserIcon)
                .child(S.documentTypeList(artistType.name).title('Artists')),

              S.listItem()
                .title('Venues')
                .icon(PinIcon)
                .child(S.documentTypeList(venueType.name).title('Venues')),

              S.listItem()
                .title('Team')
                .icon(UsersIcon)
                .child(S.documentTypeList(teamType.name).title('Team')),

              S.listItem()
                .title('Sponsors')
                .icon(HeartIcon)
                .child(S.documentTypeList(sponsorType.name).title('Sponsors')),
            ]),
        ),

      S.divider(),

      // ── Media ─────────────────────────────────────────────────────────────
      S.listItem()
        .title('Media')
        .icon(CircleIcon)
        .child(
          S.list()
            .title('Media')
            .items([
              S.listItem()
                .title('Playlists')
                .icon(CircleIcon)
                .child(S.documentTypeList(playlist.name).title('Playlists')),
            ]),
        ),

      S.divider(),

      // ── Data & Utilities ──────────────────────────────────────────────────
      S.listItem()
        .title('Data & Utilities')
        .icon(DatabaseIcon)
        .child(
          S.list()
            .title('Data & Utilities')
            .items([
              S.listItem()
                .title('Data')
                .icon(DatabaseIcon)
                .child(S.documentTypeList(dataType.name).title('Data')),
            ]),
        ),
    ])

export const schemaTypes = [
  // --- Document Types ---
  eventType,
  newsType,
  aboutType,
  newRelease,

  // --- Reference Types ---
  artistType,
  venueType,
  teamType,
  sponsorType,

  // --- Media & Content Types ---
  playlist,

  // --- Data/Utilities ---
  dataType,
]