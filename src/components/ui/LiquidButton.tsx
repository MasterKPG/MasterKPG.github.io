import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Liquid Glass Button — faithful rebuild of the Apple-style "liquid glass"
 * button (21st.dev @aliimam/liquid-glass-button): a refractive glass lens
 * driven by an SVG turbulence + displacement backdrop filter, layered specular
 * highlights, and a floating tint. Rendered once as a shared SVG filter def.
 */

let injected = false
function GlassFilter() {
  if (injected) return null
  injected = true
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <defs>
        <filter id="lg-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.4" result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold tracking-tight transition-[transform,box-shadow] duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.97] hover:-translate-y-0.5'

const tone = {
  primary: 'text-ink-950 shadow-[0_8px_30px_-6px_rgba(34,197,94,0.5)] hover:shadow-[0_14px_44px_-6px_rgba(34,197,94,0.65)]',
  glass: 'text-[rgb(var(--fg))] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_14px_44px_-8px_rgba(0,0,0,0.7)]',
}

function Layers({ variant, children }: { variant: 'primary' | 'glass'; children: ReactNode }) {
  return (
    <>
      {/* refractive backdrop lens */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ backdropFilter: 'blur(2px) url(#lg-distort)', WebkitBackdropFilter: 'blur(2px)' }}
      />
      {/* tint fill */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-full',
          variant === 'primary'
            ? 'bg-gradient-to-b from-accent-soft via-accent to-accent-dim'
            : 'bg-white/5',
        )}
      />
      {/* glass rim: bright top edge + soft inner shadow */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -8px 14px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.12)',
        }}
      />
      {/* specular top highlight */}
      <span aria-hidden className="absolute inset-x-2 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/45 to-transparent opacity-80" />
      {/* sweeping sheen on hover */}
      <span
        aria-hidden
        className="absolute -left-1/3 top-0 h-full w-1/4 -skew-x-[18deg] bg-white/30 blur-md transition-all duration-700 ease-out group-hover:left-[130%]"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )
}

type BtnProps = { variant?: 'primary' | 'glass' } & ButtonHTMLAttributes<HTMLButtonElement>
export function LiquidButton({ variant = 'primary', className, children, ...props }: BtnProps) {
  return (
    <button className={cn(base, tone[variant], className)} {...props}>
      <GlassFilter />
      <Layers variant={variant}>{children}</Layers>
    </button>
  )
}

type LinkProps = { variant?: 'primary' | 'glass' } & AnchorHTMLAttributes<HTMLAnchorElement>
export function LiquidLink({ variant = 'primary', className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, tone[variant], className)} {...props}>
      <GlassFilter />
      <Layers variant={variant}>{children}</Layers>
    </a>
  )
}
