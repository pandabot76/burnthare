import IconButton from './IconButton.jsx'
import { formatEventDate, formatCountdown } from '../utils/events.js'

export default function Hero({ event }) {
  if (!event) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center text-neutral-500 dark:text-neutral-400">
        No upcoming events right now — check back soon.
      </div>
    )
  }

  const countdown = formatCountdown(event.date)

  return (
    <section>
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <div className="relative">
          <img
            src={`/images/events/${event.image}`}
            alt={event.name}
            className="w-full h-auto block rounded-xl"
          />
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-brand-orange text-white text-xs sm:text-sm font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
            Next event
          </span>
          {countdown && (
            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-neutral-900/85 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              {countdown}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-7 pb-10">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
          {event.name}
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-[17px]">
          {formatEventDate(event.date)} · {event.location}
        </p>
        <p className="mt-2 text-brand-orange font-semibold">{event.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <IconButton href={event.bookingUrl} variant="primary" icon="go">
            Enter race
          </IconButton>
          <IconButton href={`/events/${event.id}`} variant="secondary" icon="info">
            More info
          </IconButton>
        </div>
      </div>
    </section>
  )
}
