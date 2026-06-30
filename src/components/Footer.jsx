import { useTheme } from '../context/ThemeContext.jsx'
import site from '../data/site.json'
import sponsors from '../data/sponsors.json'

export default function Footer() {
  const { isDark } = useTheme()

  return (
    <footer className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 pt-12 pb-9">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <img
          src={isDark ? '/images/logo-dark.png' : '/images/logo.png'}
          alt={site.siteName}
          className="h-10 mx-auto"
        />
        <p className="mt-3 font-bold text-brand-orange">{site.tagline}</p>

        <p className="mt-9 text-xs font-bold tracking-wide text-neutral-400 dark:text-neutral-500 uppercase">
          Our sponsors
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[150px] h-[95px] flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white p-3"
            >
              <img
                src={`/images/sponsors/${sponsor.image}`}
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain"
              />
            </a>
          ))}
        </div>

        <hr className="mt-9 border-neutral-200 dark:border-neutral-800 max-w-md mx-auto" />
        <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} {site.siteName} · Hitchin, Hertfordshire
        </p>
      </div>
    </footer>
  )
}
