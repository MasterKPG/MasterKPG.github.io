import { useRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Spotlight card: a liquid glass surface (see liquid-glass.tsx) with a radial highlight
 * that follows the cursor and a matching border glow. Pure CSS vars updated on pointer
 * move; no re-renders.
 */
export function SpotlightCard({
  children,
  className,
  spotlight = 'rgba(34,211,238,0.16)',
}: {
  children: ReactNode
  className?: string
  spotlight?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('group/spot liquid-glass relative overflow-hidden rounded-3xl', className)}
      style={{ ['--x' as string]: '50%', ['--y' as string]: '50%' }}
    >
      {/* liquid glass stack: refraction, tint, rim */}
      <div aria-hidden className="lg-refract absolute inset-0 z-0 rounded-[inherit]" />
      <div aria-hidden className="lg-tint absolute inset-0 z-10 rounded-[inherit]" />
      <div
        aria-hidden
        className="lg-rim pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
      />
      {/* spotlight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--x) var(--y), ${spotlight}, transparent 60%)`,
        }}
      />
      {/* moving border highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(220px circle at var(--x) var(--y), rgba(255,255,255,0.14), transparent 60%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      <div className="relative z-30 h-full">{children}</div>
    </div>
  )
}
