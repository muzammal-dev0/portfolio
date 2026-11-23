import { cn } from '../../utils/cn'

/**
 * One "entry" in the engineering log: an uppercase label with a hairline rule,
 * optional heading, then content in a single centred column.
 */
const LogSection = ({ id, label, title, className, children }) => (
  <section id={id} className={cn('px-6 py-20 md:py-28', className)}>
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-4">
        <h2 className="eyebrow shrink-0">{label}</h2>
        <span className="h-px flex-1 bg-ink-200" aria-hidden />
      </div>
      {title && (
        <p className="mt-8 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
          {title}
        </p>
      )}
      <div className={title ? 'mt-12' : 'mt-10'}>{children}</div>
    </div>
  </section>
)

export default LogSection
