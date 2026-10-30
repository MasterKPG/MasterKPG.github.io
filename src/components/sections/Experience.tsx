import type { ComponentType, SVGProps } from 'react'
import { COPY, EDUCATION, EXPERIENCE } from '@/lib/content'
import type { TimelineEntry } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Briefcase, GraduationCap, MapPin } from '@/components/ui/icons'

/** One row: the dates on the left; what, where and with which tools on the right. */
function Entry({ e }: { e: TimelineEntry }) {
  const { t } = useLang()
  // Places read "Organisation · Town, Country"; the town gets a pin so it scans as a place.
  const [org, location] = t(e.place).split(' · ')
  return (
    <li className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <p className="meta pt-1 text-muted">{t(e.date)}</p>
      <div>
        <h4 className="font-medium leading-snug">{t(e.title)}</h4>
        <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-muted">
          <span>{org}</span>
          {location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed">{t(e.desc)}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {e.tags.map((tag) => (
            <li key={termKey(tag)} className="chip">
              {t(tag)}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

function List({
  title,
  Icon,
  entries,
}: {
  title: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  entries: TimelineEntry[]
}) {
  return (
    <Reveal>
      <h3 className="flex items-center gap-2.5 text-xl font-medium tracking-tight">
        <Icon className="h-5 w-5 text-accent" />
        {title}
      </h3>
      <ul className="mt-4 border-t border-rule">
        {entries.map((e) => (
          <Entry key={e.title.en + e.date.en} e={e} />
        ))}
      </ul>
    </Reveal>
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
