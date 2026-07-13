import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { Magnetic } from '@/components/ui/Magnetic'

const CHANNELS = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    hint: { en: 'Fastest way to reach me', fr: 'Le moyen le plus rapide' },
  },
  {
    label: 'GitHub',
    value: 'github.com/MasterKPG',
    href: CONTACT.github,
    hint: { en: 'Code & experiments', fr: 'Code & expérimentations' },
  },
  {
    label: 'LinkedIn',
    value: 'in/mohammad-amara',
    href: CONTACT.linkedin,
    hint: { en: "Let's connect", fr: 'Connectons-nous' },
  },
]

export function Contact() {
  const { t } = useLang()

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t(COPY.contact.label)}
        </p>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t(COPY.contact.title)}
          </h2>
          <p className="max-w-sm text-lg text-muted md:text-right">{t(COPY.contact.sub)}</p>
        </div>
      </Reveal>

      {/* Editorial index: one row per channel */}
      <Reveal delay={0.1}>
        <div className="mt-14 border-t border-line">
          {CHANNELS.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-7 transition-colors hover:border-accent/40 sm:grid-cols-[3rem_1fr_1fr_auto] sm:gap-8"
            >
              <span className="font-mono text-sm text-muted/50">0{i + 1}</span>
              <span className="font-display text-2xl font-bold transition-colors group-hover:text-accent sm:text-3xl">
                {c.label}
              </span>
              <span className="hidden font-mono text-sm text-muted sm:block">{c.value}</span>
              <span className="flex items-center gap-3">
                <span className="hidden text-sm text-muted/60 md:block">{t(c.hint)}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink-950">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-12 flex justify-center">
          <Magnetic>
            <LiquidButton asChild size="lg">
              <a href={`mailto:${CONTACT.email}`}>{t(COPY.contact.email)}</a>
            </LiquidButton>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}
