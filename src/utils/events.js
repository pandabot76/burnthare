/**
 * Returns events whose date is today or in the future, sorted soonest-first.
 * This is what drives the homepage automatically — no manual "is this featured?"
 * flag needed anywhere in events.json.
 */
export function getUpcomingEvents(events) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return events
    .filter((event) => new Date(event.date) >= today)
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
 * Days from today until the event (today = 0). Negative once the event has passed.
 */
export function getDaysUntil(dateString) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(dateString)
  eventDate.setHours(0, 0, 0, 0)
  return Math.round((eventDate - today) / 86400000)
}

/**
 * "Today!" / "1 day to go" / "12 days to go" — or null once the event has passed,
 * so callers can simply skip rendering the badge.
 */
export function formatCountdown(dateString) {
  const days = getDaysUntil(dateString)
  if (days < 0) return null
  if (days === 0) return 'Today!'
  if (days === 1) return '1 day to go'
  return `${days} days to go`
}
