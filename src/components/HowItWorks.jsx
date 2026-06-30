const STEPS = [
  {
    label: 'Enter the race',
    image: '/images/process/enter-the-race.jpg',
    text: 'Pick your event and distance, then book your place through our entry partner. You\'ll get a confirmation by email with everything you need to know before race day.',
  },
  {
    label: 'Pre-race',
    image: '/images/process/pre-race.jpg',
    text: 'We\'ll be in touch nearer the date to confirm timings and number collection. Most events let you collect your race number the day before, or on the morning itself.',
  },
  {
    label: 'Race day',
    image: '/images/process/race-day.jpg',
    text: 'Arrive in good time to collect your number, warm up and find the start line — our marshals and signage will guide you. Exact start times vary by event.',
  },
  {
    label: 'Results',
    image: '/images/process/results.jpg',
    text: 'Every BurntHare event is chip-timed, so you\'ll be able to find your result soon after you finish. Head to the Results page to find the link for your race.',
  },
]

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 border-t border-neutral-100 dark:border-neutral-800">
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-6">How it works</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step) => (
          <div key={step.label}>
            <img
              src={step.image}
              alt={step.label}
              className="w-full h-[180px] object-cover rounded-xl"
            />
            <h3 className="mt-3 font-bold text-brand-orange uppercase text-sm tracking-wide">
              {step.label}
            </h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
