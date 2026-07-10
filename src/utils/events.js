/**
 * Days from today until the event (today = 0, yesterday = -1).
 */
export function getDaysUntil(dateString) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(dateString)
  eventDate.setHours(0, 0, 0, 0)
  return Math.round((eventDate - today) / 86400000)
}

/**
 * Three possible states for any event:
 *
 *   'upcoming'  — today or in the future. Show normally with Enter button.
 *   'recent'    — 1–7 days after race day. Show greyed out, Results only, no Enter.
 *   'expired'   — more than 7 days after race day. Remove from all views.
 */
export function getEventState(event) {
  const days = getDaysUntil(event.date)
  if (days >= 0) return 'upcoming'
  if (days >= -7) return 'recent'
  return 'expired'
}

/**
 * Merges BurntHare events and partner events into a single sorted list,
 * tagging each with isPartner and normalising the image fallback.
 * Expired events are excluded. This is the single list used by all carousels.
 */
export function getMergedVisibleEvents(events, partnerEvents = []) {
  const tagged = [
    ...events.map((e) => ({ ...e, isPartner: false })),
    ...partnerEvents.map((e) => ({ ...e, isPartner: true })),
  ]
  return tagged
    .filter((e) => getEventState(e) !== 'expired')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

/**
 * Returns only strictly upcoming BurntHare events (today or future).
 * Used to pick the Hero featured event — partners never feature in the hero.
 */
export function getUpcomingEvents(events) {
  return events
    .filter((e) => getDaysUntil(e.date) >= 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

/**
 * Returns all BurntHare events that should be visible (upcoming + recent within 7 days).
 * Used when you need only burnthare events (e.g. filtering on event pages).
 */
export function getVisibleEvents(events) {
  return events
    .filter((e) => getEventState(e) !== 'expired')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

export function formatEventDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatEventDateShort(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Badge text for the countdown / race-status pill shown on images.
 * Returns null once the event is expired (shouldn't be rendered at all then).
 */
export function formatCountdown(dateString) {
  const days = getDaysUntil(dateString)
  if (days > 1) return `${days} days to go`
  if (days === 1) return '1 day to go'
  if (days === 0) return 'Today!'
  if (days >= -7) return 'Race complete'
  return null
}

/**
 * Formats a start time string (e.g. "06:30") for display.
 */
export function formatStartTime(timeString) {
  if (!timeString) return null
  const [h, m] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(h, m, 0, 0)
  return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
}

/**
 * Resolves the correct image src for an event card/hero.
 * - Partner event with no image → /images/partners/no-image.jpg
 * - BurntHare event with no image → /images/events/coming-soon.jpg
 * - Otherwise → the configured image path
 */
export function getEventImageSrc(event) {
  if (event.isPartner) {
    return event.image
      ? `/images/partners/${event.image}`
      : '/images/partners/no-image.jpg'
  }
  return event.image
    ? `/images/events/${event.image}`
    : '/images/events/coming-soon.jpg'
}
