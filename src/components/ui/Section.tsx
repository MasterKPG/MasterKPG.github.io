import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

/**
 * A page section between two hairlines. `split` puts the heading in a left column that
 * stays in view on wide screens, with the content on the right; `stacked` puts the
 * heading above content that needs the full width.
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

  if (layout === 'stacked') {
    return (
      <section id={id} aria-labelledby={headingId} className={cn('border-t border-rule', className)}>
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
      </section>
    )
  }

  return (
    <section id={id} aria-labelledby={headingId} className={cn('border-t border-rule', className)}>
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
    </section>
  )
}
