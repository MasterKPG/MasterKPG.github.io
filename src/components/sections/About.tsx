import { COPY, CONTACT, SKILL_GROUPS } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'

export function About() {
  const { t } = useLang()

  const facts = [
    { label: COPY.about.studying, value: t(COPY.about.studyingValue) },
    { label: COPY.about.based, value: t(CONTACT.location) },
    { label: COPY.about.languages, value: t(CONTACT.languages) },
    { label: COPY.about.graduation, value: CONTACT.graduation },
  ]

  return (
    <Section id="about" title={t(COPY.about.title)}>
      <Reveal>
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed sm:text-xl">
          <p>{t(COPY.about.p1)}</p>
          <p className="text-muted">{t(COPY.about.p2)}</p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label.en} className="bg-bg p-4 sm:p-5">
              <dt className="meta text-muted">{t(f.label)}</dt>
              <dd className="mt-1 text-[15px] leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div id="skills" className="mt-16 scroll-mt-24">
        <Reveal>
          <h3 className="text-xl font-medium tracking-tight">{t(COPY.about.toolkit)}</h3>
        </Reveal>
        <Reveal delay={0.05}>
          <dl className="mt-5 border-t border-rule">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title.en} className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="meta pt-0.5 text-muted">{t(g.title)}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-1 gap-y-1 text-[15px]">
                    {g.items.map((item, i) => (
                      <li key={termKey(item)}>
                        {t(item)}
                        {i < g.items.length - 1 && <span className="text-muted">,</span>}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
