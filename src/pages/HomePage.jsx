import { getUpcomingEvents, getMergedVisibleEvents } from '../utils/events.js'
import Hero from '../components/Hero.jsx'
import EventCarousel from '../components/EventCarousel.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import eventsData from '../data/events.json'
import partnersData from '../data/partners.json'

export default function HomePage() {
  // Hero always shows only the soonest BurntHare event — never a partner event.
  const upcoming = getUpcomingEvents(eventsData)
  const featured = upcoming[0] ?? null

  // Carousel merges BurntHare + partner events, sorted by date,
  // excluding the featured hero event. Works fine if partners.json is empty.
  const carouselEvents = getMergedVisibleEvents(eventsData, partnersData).filter(
    (e) => e.id !== featured?.id,
  )

  return (
    <>
      <Hero event={featured} />
      <EventCarousel events={carouselEvents} />
      <HowItWorks />
    </>
  )
}
