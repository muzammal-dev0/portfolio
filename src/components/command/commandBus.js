/** Tiny event bus so any component can open the palette or the chat. */
export const OPEN_PALETTE = 'portfolio:open-palette'
export const OPEN_CHAT = 'portfolio:open-chat'

export const openPalette = (query = '') =>
  window.dispatchEvent(new CustomEvent(OPEN_PALETTE, { detail: { query } }))

export const openChat = () => window.dispatchEvent(new CustomEvent(OPEN_CHAT))

export const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

export const modKeyLabel = isMac ? '⌘' : 'Ctrl'

/** Single-key section shortcuts, shown on each module's title bar. */
export const SECTION_KEYS = {
  a: 'about',
  s: 'skills',
  p: 'projects',
  e: 'experience',
  c: 'contact',
}
