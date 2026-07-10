import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Infinite marquee. Children are rendered twice for a seamless -50% loop;
 * pauses on hover, edge-masked, reduced-motion aware (handled globally).
 */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden py-2',
        '[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max gap-0 group-hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
