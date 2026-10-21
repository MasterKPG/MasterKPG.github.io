import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { COPY, EDUCATION, EXPERIENCE } from '@/lib/content'
import type { TimelineEntry } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * One entry, driven by its own scroll position rather than a one-shot reveal: it
 * slides up and fades in as it travels from the bottom of the viewport to about a
 * third of the way up, and plays back in reverse when scrolling up.
 */
function Entry({ e }: { e: TimelineEntry }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 65%'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [56, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1])

  return (
    <motion.div ref={ref} style={reduce ? undefined : { opacity, y, scale }} className="card p-5 sm:p-6">
      <span className="font-mono text-xs uppercase tracking-wide text-accent">{t(e.date)}</span>
      <h4 className="mt-2 font-display text-lg font-semibold leading-snug">{t(e.title)}</h4>
      <p className="mt-0.5 text-sm text-muted">{t(e.place)}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{t(e.desc)}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {e.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Experience() {
  const { t } = useLang()
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="03" label={t(COPY.experience.label)} />

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
        {[
          { title: COPY.experience.education, entries: EDUCATION },
          { title: COPY.experience.career, entries: EXPERIENCE },
        ].map((col) => (
          <div key={col.title.en}>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted">{t(col.title)}</h3>
            <div className="space-y-4">
              {col.entries.map((e) => (
                <Entry key={e.title.en + e.date.en} e={e} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
