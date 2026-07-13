import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Glass button, adapted for this Vite app. Three fixes over the original snippet:
 *
 * 1. `buttonVariants({ variant, size, className })` / `liquidbuttonVariants({ variant, size, className })`
 *    silently dropped the caller's `className`: cva only resolves keys defined in its `variants`
 *    schema, so passing `className` through it (instead of appending it via `cn(...)` afterwards)
 *    meant a consumer's custom className (e.g. layout/spacing classes) was never applied.
 * 2. `LiquidButton`'s decorative glass/backdrop-filter `<div>`s were siblings of `{children}`
 *    inside `Comp`. When `asChild` is true, `Comp` becomes Radix `Slot`, which requires exactly
 *    one child and clones props onto it, so three children crashes it. The decorative layers are
 *    now siblings of `Comp` (not inside it), so `asChild` can wrap a single element (e.g. `<a>`)
 *    for link-style CTAs while the glass effect still renders around it.
 * 3. The surface was fully transparent and its rim was styled with Tailwind `dark:` variants,
 *    which never match here (light mode is marked with a `light` class, dark is the default and
 *    carries no class), so buttons were near invisible on dark backgrounds. The surface is now
 *    frosted (.liquid-frost) and the rim themed in index.css (.liquid-rim).
 */

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-primary-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-secondary hover:text-secondary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "liquid-frost text-primary hover:scale-105 duration-300 transition",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-input bg-background hover:bg-secondary hover:text-secondary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 text-xs gap-1.5 px-4 has-[>svg]:px-4",
        lg: "h-11 rounded-full px-7 has-[>svg]:px-5",
        xl: "h-12 rounded-full px-8 has-[>svg]:px-6",
        xxl: "h-14 rounded-full px-10 has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  },
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <span className="relative inline-flex">
      <Comp
        data-slot="button"
        className={cn(
          "relative z-10",
          liquidbuttonVariants({ variant, size }),
          className,
        )}
        {...props}
      >
        {children}
      </Comp>

      {/* Decorative specular rim: a sibling of Comp (not inside it) so `asChild` + Slot's
          one-child rule still holds when wrapping e.g. an <a>. The rim is themed in
          index.css (.liquid-rim) rather than with Tailwind `dark:` variants, which never
          fire here: this site marks light mode with a `light` class, never `dark`. */}
      <span
        aria-hidden
        className="liquid-rim pointer-events-none absolute inset-0 z-0 h-full w-full rounded-full transition-all"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
    </span>
  )
}

/** SVG turbulence/displacement filter the glass buttons reference by id; mount once (see App.tsx). */
function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton, GlassFilter }
