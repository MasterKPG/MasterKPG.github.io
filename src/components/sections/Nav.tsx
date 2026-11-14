import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COPY } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Mark } from '@/components/ui/Mark'

const LINKS = [
  { id: 'projects', label: COPY.nav.work },
  { id: 'about', label: COPY.nav.about },
  { id: 'experience', label: COPY.nav.experience },
  { id: 'contact', label: COPY.nav.contact },
]

/**
 * Bar fixed to the top of the page: transparent at the top, blurred page colour with a
 * hairline once the page scrolls. The CV is its one outlined action.
 *
 * On another page (the CV) pass `base`, the path back to the portfolio: the section
 * links then point there.
 */
export function Nav({ base, current }: { base?: string; current?: 'cv' } = {}) {
  const { lang, toggle: toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const onPortfolio = base === undefined
  const home = onPortfolio ? '#top' : base
  const href = (id: string) => (onPortfolio ? `#${id}` : `${base}#${id}`)
  const cvHref = onPortfolio ? 'cv/' : './'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (!onPortfolio) return
      const y = window.scrollY + 140
      let current = ''
      for (const l of LINKS) {
        const el = document.getElementById(l.id)
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) current = l.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onPortfolio])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        {t(COPY.nav.skip)}
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
          scrolled || open ? 'nav-solid' : 'border-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-5 sm:px-8" aria-label="Main">
          <a href={home} className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight">
            <Mark className="h-5 w-5" />
            Mohammad Amara
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={href(l.id)}
                aria-current={active === l.id ? 'location' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm transition-colors',
                  active === l.id ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {t(l.label)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <a
              href={cvHref}
              aria-current={current === 'cv' ? 'page' : undefined}
              className={cn('btn btn-secondary btn-sm mr-1 hidden sm:inline-flex', current === 'cv' && 'border-fg')}
            >
              {t(COPY.nav.cv)}
            </a>
            <button
              onClick={toggleLang}
              aria-label={lang === 'en' ? 'Passer en français' : 'Switch to English'}
              className="flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-xs font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={t(COPY.nav.menu)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-md text-fg hover:bg-surface-2 md:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden>
                <span
                  className={cn(
                    'absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200',
                    open && 'translate-y-1.5 rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-200',
                    open && '-translate-y-1.5 -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-rule md:hidden"
            >
              <div className="mx-auto flex max-w-page flex-col px-5 py-3 sm:px-8">
                {LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={href(l.id)}
                    onClick={() => setOpen(false)}
                    className="border-b border-rule py-3.5 text-lg last:border-0"
                  >
                    {t(l.label)}
                  </a>
                ))}
                <a href={cvHref} className="btn btn-secondary my-3 sm:hidden">
                  {t(COPY.nav.cv)}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
