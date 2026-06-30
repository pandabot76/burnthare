export default function EventSectionNav({ sections }) {
  return (
    <nav className="sticky top-[72px] z-10 bg-white/95 dark:bg-neutral-950/95 backdrop-blur border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 flex gap-6 overflow-x-auto no-scrollbar text-sm font-semibold text-neutral-500 dark:text-neutral-400">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="py-3.5 whitespace-nowrap hover:text-brand-orange transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
