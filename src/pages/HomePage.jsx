import { getUpcomingEvents } from '../utils/events.js'
import Hero from '../components/Hero.jsx'
import EventCarousel from '../components/EventCarousel.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import eventsData from '../data/events.json'

export default function HomePage() {
  // This one line is the entire "which event is featured" decision:
  // soonest date in events.json, today or later, automatically.
  const upcoming = getUpcomingEvents(eventsData)
  const [featured, ...rest] = upcoming

  return (
    <>
      <Hero event={featured} />
      <EventCarousel events={rest} />
      <HowItWorks />
    </>
  )
}
