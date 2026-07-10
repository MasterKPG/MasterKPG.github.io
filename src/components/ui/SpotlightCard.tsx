import { useRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Spotlight card — a radial highlight follows the cursor and a matching
 * border glow tracks with it (21st.dev @easemize/spotlight-card concept).
 * Pure CSS vars updated on pointer move; no re-renders.
 */
export function SpotlightCard({
  children,
  className,
  spotlight = 'rgba(34,197,94,0.16)',
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
      className={cn(
        'group/spot relative overflow-hidden rounded-3xl border border-white/8 bg-[rgb(var(--glass))]/40 backdrop-blur-xl',
        className,
      )}
      style={{ ['--x' as string]: '50%', ['--y' as string]: '50%' }}
    >
      {/* spotlight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--x) var(--y), ${spotlight}, transparent 60%)`,
        }}
      />
      {/* moving border highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(220px circle at var(--x) var(--y), rgba(255,255,255,0.14), transparent 60%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
