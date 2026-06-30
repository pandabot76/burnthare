import IconButton from './IconButton.jsx'
import { formatEventDateShort, formatCountdown } from '../utils/events.js'

export default function EventCard({ event }) {
  const countdown = formatCountdown(event.date)

  return (
    <div className="snap-start shrink-0 w-[300px] sm:w-[340px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="relative">
        <img
          src={`/images/events/${event.image}`}
          alt={event.name}
          className="w-full h-[180px] object-cover"
        />
        {countdown && (
          <span className="absolute top-2.5 right-2.5 bg-neutral-900/85 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {countdown}
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
          {formatEventDateShort(event.date)}
        </span>
        <h3 className="mt-2.5 font-bold text-lg leading-snug">{event.name}</h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{event.tagline}</p>

        <div className="mt-3.5 flex gap-2">
          <IconButton href={event.bookingUrl} variant="primary" icon="go" size="sm">
            Enter race
          </IconButton>
          <IconButton href={`/events/${event.id}`} variant="secondary" icon="info" size="sm">
            More info
          </IconButton>
        </div>
      </div>
    </div>
  )
}
