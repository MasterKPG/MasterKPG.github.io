import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COPY } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const LINKS = [
  { id: 'about', label: COPY.nav.about },
  { id: 'skills', label: COPY.nav.skills },
  { id: 'experience', label: COPY.nav.experience },
  { id: 'projects', label: COPY.nav.projects },
  { id: 'contact', label: COPY.nav.contact },
]

/**
 * Full-width bar fixed to the top of the page. Over the hero it is transparent with
 * light text (the hero is dark in both themes); once the page scrolls it picks up a
 * blurred, themed background and a hairline underneath.
 *
 * On another page (the CV) pass `base`, the path back to the portfolio: the section
 * links then navigate there instead of scrolling, and the text is themed from the start.
 */
export function Nav({ base, current }: { base?: string; current?: 'cv' } = {}) {
  const { lang, toggle: toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const onPortfolio = base === undefined

  useEffect(() => {
    // Arriving from the CV page with #section: scroll there once the page has rendered.
    const id = window.location.hash.slice(1)
    if (onPortfolio && LINKS.some((l) => l.id === id)) {
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) window.scrollTo({ top: el.offsetTop - 64 })
      })
    }
  }, [onPortfolio])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (!onPortfolio) return
      const y = window.scrollY + 120
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

  const go = (id: string) => {
    setOpen(false)
    if (!onPortfolio) {
      window.location.href = `${base}#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  // Light text while the bar floats over the dark hero, themed text once it is solid.
  // Away from the portfolio there is no hero, so the text is themed from the start.
  const solid = scrolled || open || !onPortfolio
  const filled = scrolled || open
  const linkBase = solid ? 'text-muted hover:text-[rgb(var(--fg))]' : 'text-white/70 hover:text-white'
  const linkActive = solid ? 'text-[rgb(var(--fg))]' : 'text-white'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[900] border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        filled ? 'nav-solid' : 'border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <a
          href={onPortfolio ? '#' : base}
          onClick={(e) => {
            if (!onPortfolio) return
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={cn(
            'font-display text-[15px] font-semibold tracking-tight transition-colors',
            solid ? 'text-[rgb(var(--fg))]' : 'text-white',
          )}
        >
          Mohammad Amara
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              aria-current={active === l.id ? 'true' : undefined}
              className={cn(
                'relative px-3 py-2 text-sm transition-colors',
                active === l.id ? linkActive : linkBase,
              )}
            >
              {t(l.label)}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-px h-px bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
          <a
            href={onPortfolio ? 'cv/' : undefined}
            aria-current={current === 'cv' ? 'page' : undefined}
            className={cn('relative px-3 py-2 text-sm transition-colors', current === 'cv' ? linkActive : linkBase)}
          >
            {t(COPY.nav.cv)}
            {current === 'cv' && <span className="absolute inset-x-3 -bottom-px h-px bg-accent" />}
          </a>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Passer en français' : 'Switch to English'}
            className={cn(
              'flex h-9 items-center rounded-md px-2.5 font-mono text-xs font-medium transition-colors',
              solid ? 'text-muted hover:text-[rgb(var(--fg))]' : 'text-white/70 hover:text-white',
            )}
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <ThemeToggle className={solid ? undefined : 'text-white/80 hover:text-white'} />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-md md:hidden',
              solid ? 'text-[rgb(var(--fg))]' : 'text-white',
            )}
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-4 bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-4 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-4 bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="rounded-md px-2 py-3 text-left text-sm text-muted hover:text-[rgb(var(--fg))]"
                >
                  {t(l.label)}
                </button>
              ))}
              <a
                href={onPortfolio ? 'cv/' : undefined}
                className="rounded-md px-2 py-3 text-sm text-muted hover:text-[rgb(var(--fg))]"
              >
                {t(COPY.nav.cv)}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
