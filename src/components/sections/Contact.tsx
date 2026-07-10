import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { LiquidLink } from '@/components/ui/LiquidButton'
import { Magnetic } from '@/components/ui/Magnetic'
import { DisplayCards } from '@/components/ui/DisplayCards'

const cardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
    <path d="M22 6l-10 7L2 6" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>
)

export function Contact() {
  const { t } = useLang()

  const cards = [
    {
      icon: cardIcon,
      title: 'Email',
      description: CONTACT.email,
      date: 'Say hi',
    },
    {
      icon: cardIcon,
      title: 'GitHub',
      description: 'github.com/MasterKPG',
      date: 'Code',
    },
    {
      icon: cardIcon,
      title: 'LinkedIn',
      description: 'in/mohammad-amara',
      date: 'Connect',
    },
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-aurora-cyan">
              {t(COPY.contact.label)}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-6xl">
              {t(COPY.contact.title)}
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted">{t(COPY.contact.sub)}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Magnetic>
                <LiquidLink href={`mailto:${CONTACT.email}`}>{t(COPY.contact.email)}</LiquidLink>
              </Magnetic>
              <Magnetic>
                <LiquidLink href={CONTACT.github} target="_blank" rel="noreferrer" variant="glass">
                  GitHub
                </LiquidLink>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="flex min-h-[16rem] items-center justify-center py-8">
            <DisplayCards cards={cards} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
