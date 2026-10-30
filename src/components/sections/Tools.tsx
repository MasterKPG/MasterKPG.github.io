import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { COPY } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { TOOLS, type Tool } from '@/lib/tools'
import { cn } from '@/lib/utils'
import { Rule } from '@/components/ui/motion'

function Logo({ tool }: { tool: Tool }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 px-6 text-muted">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d={tool.path} />
      </svg>
      <span className="whitespace-nowrap text-sm">{tool.label}</span>
    </li>
  )
}

/**
 * The tools behind the projects, as a slow ribbon of logos under the hero. Logos are
 * monochrome so they stay in the background. It stops on hover and has a pause button;
 * with reduced motion it is a static, wrapping list.
 */
export function Tools() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)

  return (
    <section aria-label={t(COPY.tools.label)} className="relative">
      <Rule />
      <div className="mx-auto flex max-w-page items-center gap-4 px-5 py-6 sm:px-8">
        <p className="meta hidden shrink-0 text-muted md:block">{t(COPY.tools.label)}</p>
        {reduce ? (
          <ul className="flex flex-wrap gap-y-3">
            {TOOLS.map((tool) => (
              <Logo key={tool.label} tool={tool} />
            ))}
          </ul>
        ) : (
          <>
            <div className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
              {/* Two copies side by side; the track moves by half its width and loops. */}
              <ul
                className={cn(
                  'flex w-max animate-[ribbon_70s_linear_infinite] group-hover:[animation-play-state:paused]',
                  paused && '[animation-play-state:paused]',
                )}
              >
                {[...TOOLS, ...TOOLS].map((tool, i) => (
                  <Logo key={`${tool.label}-${i}`} tool={tool} />
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? t(COPY.tools.play) : t(COPY.tools.pause)}
              aria-pressed={paused}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                {paused ? <path d="M8 5.5v13l10-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  )
}
