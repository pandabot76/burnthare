import { ArrowUpRight } from 'lucide-react'
import IconButton from './IconButton.jsx'
import {
  formatEventDateShort,
  formatCountdown,
  formatStartTime,
  getEventState,
  getEventImageSrc,
} from '../utils/events.js'

export default function EventCard({ event }) {
  const state = getEventState(event)
  if (state === 'expired') return null

  const isRecent = state === 'recent'
  const isPartner = event.isPartner === true
  const countdown = formatCountdown(event.date)
  const startTime = formatStartTime(event.startTime)
  const imageSrc = getEventImageSrc(event)

  return (
    <div
      className={`snap-start shrink-0 w-[300px] sm:w-[340px] rounded-xl border bg-white dark:bg-neutral-900 overflow-hidden transition-opacity ${
        isRecent
          ? 'opacity-50 border-neutral-200 dark:border-neutral-800'
          : 'border-neutral-200 dark:border-neutral-800'
      }`}
    >
      <div className="relative">
        <img
          src={imageSrc}
          alt={event.name}
          className={`w-full h-[180px] object-cover ${isRecent ? 'grayscale' : ''}`}
        />

        {/* Countdown / race complete pill — top right */}
        {countdown && (
          <span className={`absolute top-2.5 right-2.5 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
            isRecent ? 'bg-neutral-700/90' : 'bg-neutral-900/85'
          }`}>
            {countdown}
          </span>
        )}

        {/* Partner badge — bottom left, only on upcoming partner events */}
        {isPartner && !isRecent && (
          <span className="absolute bottom-2.5 left-2.5 bg-white/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-200 text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">
            Partner event
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
            isRecent
              ? 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
              : isPartner
                ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
                : 'bg-orange-50 text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300'
          }`}>
            {formatEventDateShort(event.date)}
          </span>
          {startTime && !isRecent && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {startTime}
            </span>
          )}
        </div>

        <h3 className="mt-2.5 font-bold text-lg leading-snug">{event.name}</h3>

        {/* Partner name shown below the event name */}
        {isPartner && event.partner && (
          <p className="mt-0.5 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
            {event.partner}
          </p>
        )}

        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{event.tagline}</p>

        <div className="mt-3.5 flex gap-2">
          {isRecent ? (
            // Race finished — show Results link only (partners may not have one)
            !isPartner && event.resultsUrl ? (
              <a
                href={event.resultsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg border-2 border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:border-neutral-500 transition-colors"
              >
                <ArrowUpRight size={15} strokeWidth={2.5} /> Results
              </a>
            ) : null
          ) : isPartner ? (
            // Partner upcoming — Enter only (no event page on our site)
            event.bookingUrl ? (
              <a
                href={event.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-white transition-colors"
              >
                <ArrowUpRight size={15} strokeWidth={2.5} /> Enter race
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wide rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500">
                Entry coming soon
              </span>
            )
          ) : (
            // BurntHare upcoming — Enter + More info (or coming soon if no booking link yet)
            <>
              {event.bookingUrl ? (
                <IconButton href={event.bookingUrl} variant="primary" icon="go" size="sm">
                  Enter race
                </IconButton>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wide rounded-lg bg-orange-50 dark:bg-orange-950 text-brand-orange dark:text-orange-400 border border-orange-200 dark:border-orange-900">
                  Entry coming soon
                </span>
              )}
              <IconButton href={`/events/${event.id}`} variant="secondary" icon="info" size="sm">
                More info
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
