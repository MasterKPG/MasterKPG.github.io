/**
 * The site mark: a plain person silhouette, a head over half-circle shoulders. The same
 * drawing as public/favicon.svg, in the current text colour.
 */
export function Mark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <circle cx="16" cy="9.5" r="6.5" />
      <path d="M3.5 30a12.5 12.5 0 0 1 25 0z" />
    </svg>
  )
}
