export default function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-[130px] max-w-6xl mx-auto px-6 py-12 border-b border-neutral-100 dark:border-neutral-800 last:border-b-0">
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-5">{title}</h2>
      {children}
    </section>
  )
}
