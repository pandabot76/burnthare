import { ArrowUpRight } from 'lucide-react'
import results from '../data/results.json'

export default function ResultsPage() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">Results</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Results are hosted by our timing partner — pick an event and year below.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 space-y-10">
        {results.map((event) => (
          <div key={event.eventId} className="border-t border-neutral-100 dark:border-neutral-800 pt-7">
            <h2 className="font-display font-extrabold text-2xl">{event.eventName}</h2>

            {event.years.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {event.years.map((y) => (
                  <a
                    key={y.year}
                    href={y.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-neutral-300 dark:border-neutral-600 font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    {y.year} <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                No results yet — check back after the first event.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
