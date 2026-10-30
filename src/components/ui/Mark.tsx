import { useId } from 'react'

/**
 * The MA monogram: an M whose last peak takes a crossbar and becomes the A. The same
 * drawing as public/favicon.svg, in the current text colour. The clip flattens the
 * peaks and the baseline like a geometric typeface.
 */
export function Mark({ className = 'h-6 w-6' }: { className?: string }) {
  const clip = useId()
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <clipPath id={clip}>
          <rect y="3" width="32" height="25" />
        </clipPath>
      </defs>
      <path
        clipPath={`url(#${clip})`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="miter"
        d="M2.9 30.3 9.75 4 16 22 22.25 4 29.1 30.3M17.1 19h9.5"
      />
    </svg>
  )
}
