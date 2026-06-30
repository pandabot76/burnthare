import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import EventCard from './EventCard.jsx'

export default function EventCarousel({ events }) {
  const trackRef = useRef(null)

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    // Scroll by roughly one card's width (+ gap) at a time, whatever the screen size.
    const amount = track.firstChild ? track.firstChild.offsetWidth + 16 : 320
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  if (!events.length) return null

  return (
    <section id="upcoming-events" className="scroll-mt-[130px] max-w-6xl mx-auto px-6 py-12 border-t border-neutral-100 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl">Upcoming events</h2>

        <div className="flex gap-2">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll to previous event"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Scroll to next event"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
