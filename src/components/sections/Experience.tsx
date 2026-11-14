import { useId, useRef, useState } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { COPY, EDUCATION, EXPERIENCE } from '@/lib/content'
import type { TimelineEntry } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Briefcase, GraduationCap, MapPin, Plus } from '@/components/ui/icons'
import { EASE } from '@/components/ui/motion'

/**
 * One row: what, where and when. The details (a sentence and the tools) stay folded
 * until the row is opened, so the list scans in a few seconds.
 */
function Entry({ e }: { e: TimelineEntry }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const panel = useId()
  // Places read "Organisation · Town, Country"; the town gets a pin so it scans as a place.
  const [org, location] = t(e.place).split(' · ')

  return (
    <li className="relative border-b border-rule">
      {/* The entry's point on the rail. */}
      <span
        aria-hidden
        className={cn(
          'absolute -left-7 top-[1.7rem] h-[11px] w-[11px] rounded-full border-2 bg-bg transition-colors duration-300',
          open ? 'border-accent' : 'border-rule-strong',
        )}
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panel}
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-start gap-4 py-5 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-snug transition-colors group-hover:text-accent">
            {t(e.title)}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-muted">
            <span>{org}</span>
            {location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
            )}
            <span className="meta sm:hidden">{t(e.date)}</span>
          </span>
        </span>
        <span className="meta hidden shrink-0 pt-0.5 text-muted sm:block">{t(e.date)}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors group-hover:bg-surface-2 group-hover:text-fg">
          <Plus className={cn('h-4 w-4 transition-transform duration-500 ease-spring', open && 'rotate-[135deg]')} />
          <span className="sr-only">{t(COPY.experience.more)}</span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-xl text-[15px] leading-relaxed">{t(e.desc)}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5 pb-6">
              {e.tags.map((tag) => (
                <li key={termKey(tag)} className="chip">
                  {t(tag)}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

/** A list on a rail. The rail fills in the accent as the list scrolls through the page. */
function List({
  title,
  Icon,
  entries,
}: {
  title: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  entries: TimelineEntry[]
}) {
  const ref = useRef<HTMLUListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <div>
      <Reveal>
        <h3 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
          <Icon className="h-5 w-5 text-accent" />
          {title}
        </h3>
      </Reveal>
      <ul ref={ref} className="relative mt-4 border-t border-rule pl-7">
        <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-rule" />
        <motion.span
          aria-hidden
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent"
        />
        {entries.map((e) => (
          <Entry key={e.title.en + e.date.en} e={e} />
        ))}
      </ul>
    </div>
  )
}

export function Experience() {
  const { t } = useLang()
  return (
    <Section id="experience" title={t(COPY.experience.title)}>
      <List title={t(COPY.experience.work)} Icon={Briefcase} entries={EXPERIENCE} />
      <div className="mt-16">
        <List title={t(COPY.experience.education)} Icon={GraduationCap} entries={EDUCATION} />
      </div>
    </Section>
  )
}
