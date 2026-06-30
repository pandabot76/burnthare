import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import site from '../data/site.json'

function NavItems({ className, onItemClick }) {
  return (
    <>
      {site.nav.map((item) =>
        item.href.startsWith('/') && !item.href.includes('#') ? (
          <NavLink
            key={item.label}
            to={item.href}
            onClick={onItemClick}
            className={({ isActive }) =>
              `${className} hover:text-brand-orange ${isActive ? 'text-brand-orange' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ) : (
          <a key={item.label} href={item.href} onClick={onItemClick} className={`${className} hover:text-brand-orange`}>
            {item.label}
          </a>
        ),
      )}
    </>
  )
}

export default function Header() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <img
            src={isDark ? '/images/logo-dark.png' : '/images/logo.png'}
            alt="BurntHare"
            className="h-9"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] text-neutral-700 dark:text-neutral-300">
          <NavItems className="transition-colors" />
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors"
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} className="text-amber-500" />}
            <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
          </button>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-4 flex flex-col gap-1 text-[15px] text-neutral-700 dark:text-neutral-300">
          <NavItems className="py-2.5 transition-colors" onItemClick={() => setMobileOpen(false)} />
        </nav>
      )}
    </header>
  )
}
