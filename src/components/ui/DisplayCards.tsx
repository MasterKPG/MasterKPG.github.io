import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DisplayCardProps {
  icon?: ReactNode
  title?: string
  description?: string
  date?: string
  className?: string
}

/**
 * Display cards — fanned stack of skewed glass cards that de-blur and lift
 * on hover, in the spirit of 21st.dev @Codehagen/display-cards.
 */
function DisplayCard({ icon, title, description, date, className }: DisplayCardProps) {
  return (
    <div
      className={cn(
        'glass relative flex h-40 w-[22rem] max-w-[85vw] -skew-y-[6deg] select-none flex-col justify-between rounded-2xl px-5 py-4',
        'transition-all duration-500 hover:border-accent/40 hover:bg-[rgb(var(--glass))]/80',
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[16rem] after:bg-gradient-to-l after:from-[rgb(var(--bg))] after:to-transparent after:content-['']",
        'hover:after:opacity-0 after:transition-opacity after:duration-500',
        '[&>*]:flex [&>*]:items-center [&>*]:gap-2',
        className,
      )}
    >
      <div>
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent">
          {icon}
        </span>
        <p className="font-display text-lg font-semibold">{title}</p>
      </div>
      <p className="truncate text-sm text-muted">{description}</p>
      <p className="font-mono text-xs text-muted/70">{date}</p>
    </div>
  )
}

export function DisplayCards({ cards }: { cards: DisplayCardProps[] }) {
  const stackClasses = [
    "[grid-area:stack] hover:-translate-y-12 z-10",
    "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-4 z-20",
    "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-4 z-30",
  ]
  return (
    <div className="grid animate-in place-items-center opacity-100 [grid-template-areas:'stack']">
      {cards.slice(0, 3).map((card, i) => (
        <DisplayCard
          key={i}
          {...card}
          className={cn(stackClasses[i], 'transition-transform duration-500', card.className)}
        />
      ))}
    </div>
  )
}
