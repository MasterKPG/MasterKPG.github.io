import { COPY, CONTACT, PROJECTS } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

const stats = [
  { value: `${PROJECTS.length}`, label: { en: 'Projects', fr: 'Projets' } },
  { value: '3', label: { en: 'Languages', fr: 'Langues' } },
  { value: '2028', label: { en: 'Graduation', fr: 'Diplôme' } },
]

export function About() {
  const { t } = useLang()
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="01" label={t(COPY.about.label)} />

      <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
        <div className="space-y-5">
          <Reveal delay={0.05}>
            <p className="text-lg leading-relaxed text-muted">{t(COPY.about.p1)}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">{t(COPY.about.p2)}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-8 grid grid-cols-3 border-t border-line">
              {stats.map((s) => (
                <div key={s.value} className="pt-5">
                  <dt className="sr-only">{t(s.label)}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-sm text-muted">{t(s.label)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card p-6">
            <h3 className="mb-4 border-b border-line pb-3 font-display font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <ContactRow label="Email" href={`mailto:${CONTACT.email}`} value={CONTACT.email} />
              <ContactRow
                label={t({ en: 'Phone', fr: 'Téléphone' })}
                href={`tel:${CONTACT.phone}`}
                value={CONTACT.phoneDisplay}
              />
              <ContactRow label={t({ en: 'Location', fr: 'Lieu' })} value={t(CONTACT.location)} />
              <ContactRow label="GitHub" href={CONTACT.github} value="github.com/MasterKPG" />
              <ContactRow label="LinkedIn" href={CONTACT.linkedin} value="in/mohammad-amara" />
              <ContactRow label={t({ en: 'Languages', fr: 'Langues' })} value={t(CONTACT.languages)} />
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <li className="flex items-start justify-between gap-4">
      <span className="font-mono text-xs uppercase tracking-wide text-muted">{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          className="text-right text-[rgb(var(--fg))] transition-colors hover:text-accent"
        >
          {value}
        </a>
      ) : (
        <span className="text-right text-[rgb(var(--fg))]">{value}</span>
      )}
    </li>
  )
}
