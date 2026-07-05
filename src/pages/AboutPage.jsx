import { Mail, Facebook, Instagram } from 'lucide-react'
import about from '../data/about.json'

export default function AboutPage() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">About BurntHare</h1>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-neutral-100 dark:border-neutral-800">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-5">Our story</h2>
        <div className="space-y-4 max-w-3xl text-[17px] leading-relaxed text-neutral-700 dark:text-neutral-300">
          {about.history.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-neutral-100 dark:border-neutral-800">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-5">What people say</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {about.testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col"
            >
              <p className="text-neutral-700 dark:text-neutral-300 flex-1">"{t.quote}"</p>
              <p className="mt-3 font-semibold">{t.name}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.context}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-[88px] max-w-6xl mx-auto px-6 py-10 border-t border-neutral-100 dark:border-neutral-800"
      >
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-5">Get in touch</h2>
        <div className="flex flex-wrap gap-5 text-[15px]">
          {/* Email is rendered as a click-to-email button; the raw address is kept
              out of the page source to reduce spam-harvesting. */}
          <a
            href={`mailto:${about.contact.email}`}
            className="flex items-center gap-2 font-semibold text-brand-orange"
          >
            <Mail size={18} /> Email us
          </a>
          {about.contact.facebook && (
            <a
              href={about.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold hover:text-brand-orange"
            >
              <Facebook size={18} /> Facebook
            </a>
          )}
          {about.contact.instagram && (
            <a
              href={about.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold hover:text-brand-orange"
            >
              <Instagram size={18} /> Instagram
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
