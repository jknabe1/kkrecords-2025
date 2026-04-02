// ============================================================================
// Sanity Schema Types Index
// ============================================================================
// Organized into three categories: Document Types, Reference Types, and Utilities
// ============================================================================

// --- Document Types (main content types) ---
import { eventType } from './eventType'
import { newsType } from './newsType'
import { aboutType } from './aboutType'
import { newRelease } from './newReleaseType'

// --- Reference Types (referenced by other documents) ---
import { artistType } from './artistType'
import { venueType } from './venueType'
import { teamType } from './teamType'
import { sponsorType } from './sponsorType'

// --- Media & Content Types ---
import { video } from './videoType'
import { playlist } from './playListType'

// --- Data/Utility Types ---
import { dataType } from './dataType'

/**
 * Export all schema types for Sanity Studio.
 * Organized by type category for better maintainability:
 * - Document Types: Primary content accessible via routes
 * - Reference Types: Entities referenced by documents
 * - Media & Content: Content management types
 * - Utilities: Data storage and utility schemas
 */
export const schemaTypes = [
  // --- Document Types (Primary Content) ---
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
  video,
  playlist,

  // --- Data/Utilities ---
  dataType,
]