import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { COPY, EDUCATION, EXPERIENCE } from '@/lib/content'
import type { TimelineEntry } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { SectionHeader } from '@/components/ui/SectionHeader'

function EntryCard({ e }: { e: TimelineEntry }) {
  const { t } = useLang()
  return (
    <>
      <span className="font-mono text-xs uppercase tracking-wide text-accent">{t(e.date)}</span>
      <h4 className="mt-2 font-display text-lg font-semibold leading-snug">{t(e.title)}</h4>
      <p className="mt-0.5 text-sm text-muted">{t(e.place)}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{t(e.desc)}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {e.tags.map((tag) => (
          <span key={termKey(tag)} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
            {t(tag)}
          </span>
        ))}
      </div>
    </>
  )
}

/**
 * One entry, driven by its own scroll position rather than a one-shot reveal: it
 * slides up and fades in as it travels from the bottom of the viewport to about a
 * third of the way up, and plays back in reverse when scrolling up.
 */
function Entry({ e }: { e: TimelineEntry }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 65%'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [56, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1])

  return (
    <motion.div ref={ref} style={reduce ? undefined : { opacity, y, scale }} className="card p-5 sm:p-6">
      <EntryCard e={e} />
    </motion.div>
  )
}

/** Every experience entry in a scrollable dialog. */
function AllExperience({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(COPY.experience.career)}
            className="card-solid relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="font-display text-xl font-semibold">{t(COPY.experience.career)}</h3>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label={t(COPY.projects.close)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-[rgb(var(--fg)/0.08)] hover:text-[rgb(var(--fg))]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto p-6">
              {EXPERIENCE.map((e) => (
                <div key={e.title.en + e.date.en} className="card p-5 sm:p-6">
                  <EntryCard e={e} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Experience() {
  const { t } = useLang()
  const eduRef = useRef<HTMLDivElement>(null)
  const expRef = useRef<HTMLDivElement>(null)
  const [eduHeight, setEduHeight] = useState<number | null>(null)
  const [overflows, setOverflows] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  // The experience column is capped at the height of the education column; whatever
  // does not fit fades out behind the "see all" button.
  useEffect(() => {
    const edu = eduRef.current
    const exp = expRef.current
    if (!edu || !exp) return
    const measure = () => {
      const h = edu.offsetHeight
      setEduHeight(h)
      setOverflows(exp.scrollHeight > h + 1)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(edu)
    ro.observe(exp)
    measure()
    return () => ro.disconnect()
  }, [])

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="03" label={t(COPY.experience.label)} />

      <div className="mt-14 grid gap-16 md:grid-cols-2 md:gap-20 lg:gap-24">
        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {t(COPY.experience.education)}
          </h3>
          <div ref={eduRef} className="space-y-4">
            {EDUCATION.map((e) => (
              <Entry key={e.title.en + e.date.en} e={e} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {t(COPY.experience.career)}
          </h3>
          <div
            ref={expRef}
            className="relative space-y-4 overflow-hidden"
            style={eduHeight ? { maxHeight: eduHeight } : undefined}
          >
            {EXPERIENCE.map((e) => (
              <Entry key={e.title.en + e.date.en} e={e} />
            ))}
            {overflows && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-48 items-end justify-center bg-gradient-to-b from-transparent via-[rgb(var(--bg)/0.85)] to-[rgb(var(--bg))] pb-2">
                <button
                  onClick={() => setOpen(true)}
                  className="pointer-events-auto inline-flex h-10 items-center gap-2 rounded-full border border-line bg-[rgb(var(--bg-elevated))] px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {t(COPY.experience.seeAll)}
                  <span aria-hidden>↗</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AllExperience open={open} onClose={close} />
    </section>
  )
}
