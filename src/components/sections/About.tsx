import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { TiltCard } from '@/components/ui/TiltCard'

const stats = [
  { value: '9+', label: { en: 'Projects', fr: 'Projets' } },
  { value: '3', label: { en: 'Languages', fr: 'Langues' } },
  { value: '2027', label: { en: 'Graduation', fr: 'Diplôme' } },
]

export function About() {
  const { t } = useLang()
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t(COPY.about.label)}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{t(COPY.about.title)}</h2>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Reveal delay={0.05}>
            <p className="text-lg leading-relaxed text-muted">{t(COPY.about.p1)}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lg leading-relaxed text-muted">{t(COPY.about.p2)}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.value} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted">{t(s.label)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <TiltCard className="group relative">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6">
              <h3 className="mb-4 border-b border-line pb-3 font-display font-semibold">
                Contact
              </h3>
              <ul className="space-y-3 text-sm">
                <ContactRow label="Email" href={`mailto:${CONTACT.email}`} value={CONTACT.email} />
                <ContactRow label="Location" value={t(CONTACT.location)} />
                <ContactRow label="GitHub" href={CONTACT.github} value="github.com/MasterKPG" />
                <ContactRow
                  label="LinkedIn"
                  href={CONTACT.linkedin}
                  value="in/mohammad-amara"
                />
                <ContactRow label="Languages" value={t(CONTACT.languages)} />
              </ul>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <li className="flex items-start justify-between gap-4">
      <span className="font-mono text-xs uppercase tracking-wide text-muted/70">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
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
