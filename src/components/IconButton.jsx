import { Link } from 'react-router-dom'
import { ArrowUpRight, Info } from 'lucide-react'

/**
 * variant="primary"   -> solid orange "Enter race" button (links out to booking site)
 * variant="secondary" -> outlined "More info" button (links to the event page, on-site)
 */
export default function IconButton({ href, variant = 'primary', icon = 'go', children, size = 'md' }) {
  const isPrimary = variant === 'primary'
  const Icon = icon === 'info' ? Info : ArrowUpRight

  const sizeClasses = size === 'sm' ? 'px-3 py-2 text-sm gap-1.5' : 'px-4 py-2.5 text-[15px] gap-2'

  const base = `inline-flex items-center rounded-lg font-semibold transition-colors ${sizeClasses}`
  const styles = isPrimary
    ? 'bg-brand-orange text-white hover:bg-brand-orange-dark'
    : 'border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 dark:border-neutral-600 dark:text-neutral-50 dark:hover:border-neutral-400'

  const content = (
    <>
      <Icon size={16} strokeWidth={2.5} />
      {children}
    </>
  )

  if (isPrimary) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
        {content}
      </a>
    )
  }

  return (
    <Link to={href} className={`${base} ${styles}`}>
      {content}
    </Link>
  )
}
