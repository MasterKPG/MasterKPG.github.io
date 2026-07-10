import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { COPY, EDUCATION, EXPERIENCE } from '@/lib/content'
import type { TimelineEntry } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'

function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative pl-8">
      {/* track */}
      <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 rounded-full bg-[rgb(var(--fg))]/10" />
      {/* scrubbed fill */}
      <motion.div
        style={{ height }}
        className="absolute left-[7px] top-2 w-0.5 rounded-full bg-gradient-to-b from-aurora-cyan via-aurora-violet to-aurora-magenta"
      />

      <div className="space-y-8">
        {entries.map((e, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-violet shadow-[0_0_0_4px_rgba(139,92,246,0.18)]" />
              <div className="glass rounded-2xl p-5 transition-transform duration-300 hover:translate-x-1">
                <span className="font-mono text-xs uppercase tracking-wide text-aurora-cyan">
                  {t(e.date)}
                </span>
                <h4 className="mt-1.5 font-display text-lg font-semibold">{t(e.title)}</h4>
                <p className="text-sm text-aurora-violet">{t(e.place)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(e.desc)}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[rgb(var(--fg))]/6 px-2.5 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function Experience() {
  const { t } = useLang()
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-aurora-cyan">
          {t(COPY.experience.label)}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
          {t(COPY.nav.experience)}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="mb-6 font-display text-xl font-semibold text-muted">
            {t(COPY.experience.education)}
          </h3>
          <TimelineList entries={EDUCATION} />
        </div>
        <div>
          <h3 className="mb-6 font-display text-xl font-semibold text-muted">
            {t(COPY.experience.career)}
          </h3>
          <TimelineList entries={EXPERIENCE} />
        </div>
      </div>
    </section>
  )
}
