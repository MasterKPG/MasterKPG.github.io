import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'
import { Rule } from './motion'

/** Registration marks where a section's top rule meets the page frame, as on a drawing. */
function Marks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden max-w-page xl:block">
      <span className="absolute -left-[5px] -top-[5px] h-[11px] w-[11px] text-rule-strong">
        <Cross />
      </span>
      <span className="absolute -right-[5px] -top-[5px] h-[11px] w-[11px] text-rule-strong">
        <Cross />
      </span>
    </div>
  )
}

function Cross() {
  return (
    <svg viewBox="0 0 11 11" className="h-full w-full" fill="none" stroke="currentColor">
      <path d="M5.5 0v11M0 5.5h11" />
    </svg>
  )
}

/**
 * A page section under a hairline that draws itself in. `split` puts the heading in a
 * left column that stays in view on wide screens, with the content on the right;
 * `stacked` puts the heading above content that needs the full width.
 */
export function Section({
  id,
  title,
  sub,
  layout = 'split',
  className,
  children,
}: {
  id: string
  title: string
  sub?: string
  layout?: 'split' | 'stacked'
  className?: string
  children: ReactNode
}) {
  const headingId = `${id}-title`

  return (
    <section id={id} aria-labelledby={headingId} className={cn('relative', className)}>
      <Rule />
      <Marks />
      {layout === 'stacked' ? (
        <div className="mx-auto max-w-page px-5 py-20 sm:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-12">
              <h2 id={headingId} className="display text-[2rem] sm:text-[2.75rem]">
                {title}
              </h2>
              {sub && <p className="max-w-md text-muted md:text-right">{sub}</p>}
            </div>
          </Reveal>
          <div className="mt-12 md:mt-16">{children}</div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-page gap-10 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal className="md:sticky md:top-28">
              <h2 id={headingId} className="display text-[2rem] sm:text-[2.75rem]">
                {title}
              </h2>
              {sub && <p className="mt-3 max-w-xs text-muted">{sub}</p>}
            </Reveal>
          </div>
          <div className="md:col-span-8">{children}</div>
        </div>
      )}
    </section>
  )
}
