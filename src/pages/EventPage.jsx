import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Image as ImageIcon } from 'lucide-react'
import eventsData from '../data/events.json'
import { formatEventDate, getUpcomingEvents } from '../utils/events.js'
import IconButton from '../components/IconButton.jsx'
import EventSectionNav from '../components/EventSectionNav.jsx'
import Section from '../components/Section.jsx'
import EventCarousel from '../components/EventCarousel.jsx'

export default function EventPage() {
  const { eventId } = useParams()
  const event = eventsData.find((e) => e.id === eventId)

  if (!event) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display font-extrabold text-3xl mb-3">Event not found</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">
          That event doesn't exist (yet) — it may have been renamed or removed.
        </p>
        <Link to="/" className="text-brand-orange font-semibold">
          ← Back to all events
        </Link>
      </div>
    )
  }

  // Same source of truth as the homepage carousel — just excludes whichever
  // event the visitor is currently looking at.
  const otherUpcomingEvents = getUpcomingEvents(eventsData).filter((e) => e.id !== event.id)

  // Build the section nav from whichever fields actually have content —
  // an event missing "rules", for example, just won't show that tab.
  const sections = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'races', label: 'Races', show: event.races?.length },
    { id: 'course', label: 'Course', show: event.course },
    { id: 'registration', label: 'Registration', show: event.registration },
    { id: 'rules', label: 'Rules', show: event.rules?.length },
    { id: 'prizes', label: 'Prizes', show: event.prizes?.length },
    { id: 'location', label: 'Location', show: event.locationDetails },
    { id: 'upcoming-events', label: 'Upcoming events', show: otherUpcomingEvents.length },
  ].filter((s) => s.show)

  const mapEmbedSrc = event.locationDetails?.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(event.locationDetails.mapQuery)}&output=embed`
    : null

  return (
    <div>
      {/* Poster / banner */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <img
          src={`/images/events/${event.poster || event.image}`}
          alt={event.name}
          className="w-full h-auto block rounded-xl"
        />
      </div>

      {/* Title block */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-7">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">{event.name}</h1>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-neutral-600 dark:text-neutral-400 text-[15px]">
          <span className="flex items-center gap-1.5">
            <Calendar size={16} /> {formatEventDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={16} /> {event.location}
          </span>
        </div>

        <p className="mt-2 text-brand-orange font-semibold">{event.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <IconButton href={event.bookingUrl} variant="primary" icon="go">
            Enter race
          </IconButton>
          <a
            href={`/images/events/${event.poster || event.image}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[15px] font-semibold rounded-lg border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-400 transition-colors"
          >
            <ImageIcon size={16} strokeWidth={2.5} /> View poster
          </a>
        </div>
      </div>

      <EventSectionNav sections={sections} />

      <Section id="overview" title="Overview">
        <p className="text-[17px] leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-3xl">
          {event.summary}
        </p>
      </Section>

      {event.races?.length > 0 && (
        <Section id="races" title="Races">
          <div className="grid sm:grid-cols-2 gap-4">
            {event.races.map((race) => (
              <div
                key={race.name}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5"
              >
                <h3 className="font-bold text-lg">{race.name}</h3>
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">{race.distance}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {race.ages && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {race.ages}
                    </span>
                  )}
                  {race.disciplines?.map((d) => (
                    <span
                      key={d}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950 text-brand-orange-dark dark:text-orange-300"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {event.course && (
        <Section id="course" title="Course">
          <p className="text-[17px] leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-3xl">
            {event.course.description}
          </p>

          {event.course.maps?.length > 0 && (
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {event.course.maps.map((map) => (
                <div key={map.image}>
                  <img
                    src={`/images/course-maps/${map.image}`}
                    alt={map.label}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
                  />
                  <p className="mt-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                    {map.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {event.registration && (
        <Section id="registration" title="Registration">
          <div className="max-w-3xl">
            <p className="font-semibold text-lg">{event.registration.feeNote}</p>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">{event.registration.deadline}</p>
            {event.registration.notes?.length > 0 && (
              <ul className="mt-4 space-y-2 text-neutral-700 dark:text-neutral-300">
                {event.registration.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="text-brand-orange">•</span> {note}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5">
              <IconButton href={event.bookingUrl} variant="primary" icon="go">
                Enter race
              </IconButton>
            </div>
          </div>
        </Section>
      )}

      {event.rules?.length > 0 && (
        <Section id="rules" title="Rules">
          <ul className="space-y-2.5 text-neutral-700 dark:text-neutral-300 max-w-3xl">
            {event.rules.map((rule) => (
              <li key={rule} className="flex gap-2.5">
                <span className="text-brand-orange">•</span> {rule}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {event.prizes?.length > 0 && (
        <Section id="prizes" title="Prizes, t-shirts & medals">
          <ul className="grid sm:grid-cols-2 gap-3">
            {event.prizes.map((prize) => (
              <li
                key={prize}
                className="rounded-lg bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-neutral-700 dark:text-neutral-300"
              >
                {prize}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {event.locationDetails && (
        <Section id="location" title="Location & directions">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold">{event.locationDetails.address}</p>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">{event.locationDetails.parking}</p>
            </div>
            {mapEmbedSrc && (
              <iframe
                title="Event location map"
                src={mapEmbedSrc}
                className="w-full h-[260px] rounded-xl border border-neutral-200 dark:border-neutral-800"
                loading="lazy"
              />
            )}
          </div>
        </Section>
      )}

      <EventCarousel events={otherUpcomingEvents} />
    </div>
  )
}
