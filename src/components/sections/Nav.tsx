import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { COPY } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Magnetic } from '@/components/ui/Magnetic'

const LINKS = [
  { id: 'about', label: COPY.nav.about },
  { id: 'skills', label: COPY.nav.skills },
  { id: 'experience', label: COPY.nav.experience },
  { id: 'projects', label: COPY.nav.projects },
  { id: 'contact', label: COPY.nav.contact },
]

export function Nav() {
  const { lang, toggle: toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const y = window.scrollY + 120
      for (const l of LINKS) {
        const el = document.getElementById(l.id)
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(l.id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[900] transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className={`flex w-full items-center justify-between rounded-full px-4 py-2 transition-all ${scrolled ? 'glass-strong' : ''}`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-sm font-bold tracking-tight"
            data-cursor
          >
            <span className="text-gradient">Mohammad Amara</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === l.id ? 'text-[rgb(var(--fg))]' : 'text-muted hover:text-[rgb(var(--fg))]'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/15"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                )}
                {t(l.label)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="glass flex h-10 items-center rounded-full px-3 font-mono text-xs font-semibold transition-transform hover:scale-105"
            >
              {lang === 'en' ? 'EN' : 'FR'}
            </button>
            <Magnetic strength={0.25}>
              <ThemeToggle />
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            >
              <div className="space-y-1">
                <span className={`block h-0.5 w-4 bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-4 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-4 bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-2 md:hidden"
        >
          <div className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded-xl px-4 py-2.5 text-left text-sm text-muted hover:bg-accent/10 hover:text-[rgb(var(--fg))]"
              >
                {t(l.label)}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
