import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Liquid glass surface: three layers behind the content.
 *   1. refraction: a blurred backdrop pushed through the SVG displacement filter below
 *   2. tint: a flat translucent fill
 *   3. rim: inset specular highlights along the edge
 *
 * Adapted from the original snippet for this site:
 * . the original hardcoded a white tint, white rims and black text, which only works over
 *   a photo in light mode. The tint and rim are themed in index.css (.lg-tint / .lg-rim)
 *   so the surface reads on both the graphite dark background and the light one.
 * . `rounded-inherit` and `rounded-4xl` are not Tailwind v3 classes and did nothing. The
 *   layers use `rounded-[inherit]`, so the caller sets the radius once on the wrapper.
 *
 * The displacement is only visible where the backdrop has contrast; over a flat section
 * background it reads as a plain frosted pane, which is the intended fallback. Browsers
 * without SVG filters in backdrop-filter (Safari) degrade to blur + tint + rim.
 *
 * Requires <LiquidGlassFilter /> mounted once (see App.tsx) for the filter id it references.
 */
export function LiquidGlass({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={cn('liquid-glass relative overflow-hidden', className)} style={style}>
      <div aria-hidden className="lg-refract absolute inset-0 z-0 rounded-[inherit]" />
      <div aria-hidden className="lg-tint absolute inset-0 z-10 rounded-[inherit]" />
      <div aria-hidden className="lg-rim pointer-events-none absolute inset-0 z-20 rounded-[inherit]" />
      <div className="relative z-30 h-full">{children}</div>
    </div>
  )
}

/** SVG displacement filter the liquid glass surfaces reference by id; mount once (see App.tsx). */
export function LiquidGlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <filter
        id="liquid-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        {/* Scale 200 (as in the original) smears a card-sized backdrop badly; 100 keeps the
            refraction readable at this size. */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="100"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}
