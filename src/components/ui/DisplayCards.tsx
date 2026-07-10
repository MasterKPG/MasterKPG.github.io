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
 * Display cards — a gently fanned stack of glass cards that spread apart and
 * lift on hover (21st.dev @Codehagen/display-cards). Spaced so every card's
 * text stays legible.
 */
function DisplayCard({ icon, title, description, date, className }: DisplayCardProps) {
  return (
    <div
      className={cn(
        'glass relative flex h-32 w-[21rem] max-w-[86vw] -skew-y-[5deg] select-none flex-col justify-between rounded-2xl px-5 py-4',
        'transition-all duration-500 hover:-skew-y-0 hover:border-accent/40 hover:bg-[rgb(var(--glass))]/80',
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent">
          {icon}
        </span>
        <p className="font-display text-lg font-bold">{title}</p>
      </div>
      <p className="text-sm text-[rgb(var(--fg))]/80">{description}</p>
      <p className="font-mono text-xs text-muted/70">{date}</p>
    </div>
  )
}

export function DisplayCards({ cards }: { cards: DisplayCardProps[] }) {
  // Larger vertical steps so no card covers the text of the one beneath it.
  const stackClasses = [
    "[grid-area:stack] z-30 hover:-translate-y-2",
    "[grid-area:stack] translate-x-6 translate-y-28 z-20 hover:-translate-y-2 hover:translate-x-6",
    "[grid-area:stack] translate-x-12 translate-y-56 z-10 hover:translate-y-52",
  ]
  return (
    <div className="grid place-items-center pb-40 [grid-template-areas:'stack']">
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
