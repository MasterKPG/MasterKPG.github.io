import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Liquid glass button — refractive glass surface with specular top edge
 * and a soft internal glow, in the spirit of 21st.dev @aliimam/liquid-glass-button.
 */
const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora-cyan active:scale-[0.97]'

const variants = {
  primary:
    'text-white shadow-[0_8px_32px_rgba(139,92,246,0.35)] hover:shadow-[0_12px_44px_rgba(139,92,246,0.5)] hover:-translate-y-0.5',
  glass:
    'glass text-[rgb(var(--fg))] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(34,211,238,0.18)]',
}

function Inner({ variant, children }: { variant: 'primary' | 'glass'; children: ReactNode }) {
  return (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-magenta opacity-90 transition-opacity group-hover:opacity-100"
        />
      )}
      {/* specular highlight — the "liquid" top light */}
      <span
        aria-hidden
        className="absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/35 to-transparent"
      />
      {/* sweeping sheen */}
      <span
        aria-hidden
        className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )
}

type BtnProps = { variant?: 'primary' | 'glass' } & ButtonHTMLAttributes<HTMLButtonElement>

export function LiquidButton({ variant = 'primary', className, children, ...props }: BtnProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  )
}

type LinkProps = { variant?: 'primary' | 'glass' } & AnchorHTMLAttributes<HTMLAnchorElement>

export function LiquidLink({ variant = 'primary', className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </a>
  )
}
