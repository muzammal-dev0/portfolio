/** Base path without extension — place `profile.jpg`, `profile.png`, etc. in public/images/ */
export const PROFILE_IMAGE_BASE = '/images/profile'

/** Tried in order until one loads (covers common extensions and casing). */
export const PROFILE_IMAGE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'JPG',
  'JPEG',
  'PNG',
  'WEBP',
]

export const PROFILE_IMAGE_CANDIDATES = PROFILE_IMAGE_EXTENSIONS.map(
  (ext) => `${PROFILE_IMAGE_BASE}.${ext}`
)

/** Default for static meta tags (og:image) when a single URL is required. */
export const PROFILE_IMAGE_OG = `${PROFILE_IMAGE_BASE}.jpg`
