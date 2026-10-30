import { COPY, EDUCATION, EXPERIENCE } from '@/lib/content'
import type { TimelineEntry } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'

/** One row: the dates on the left, what and where on the right. */
function Entry({ e }: { e: TimelineEntry }) {
  const { t } = useLang()
  return (
    <li className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <p className="meta pt-1 text-muted">{t(e.date)}</p>
      <div>
        <h4 className="font-medium leading-snug">{t(e.title)}</h4>
        <p className="mt-0.5 text-[15px] text-muted">{t(e.place)}</p>
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

function List({ title, entries }: { title: string; entries: TimelineEntry[] }) {
  return (
    <Reveal>
      <h3 className="text-xl font-medium tracking-tight">{title}</h3>
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
      <List title={t(COPY.experience.work)} entries={EXPERIENCE} />
      <div className="mt-16">
        <List title={t(COPY.experience.education)} entries={EDUCATION} />
      </div>
    </Section>
  )
}
