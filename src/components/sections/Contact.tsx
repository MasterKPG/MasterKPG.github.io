import { useEffect, useState } from 'react'
import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowUpRight, Check, Copy, FileText, GitHub, LinkedIn, Phone } from '@/components/ui/icons'

export function Contact() {
  const { t, lang } = useLang()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(id)
  }, [copied])

  const copy = () => {
    navigator.clipboard?.writeText(CONTACT.email).then(() => setCopied(true), () => {})
  }

  const channels = [
    { label: t(COPY.contact.phone), value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}`, Icon: Phone },
    { label: 'GitHub', value: CONTACT.githubUser, href: CONTACT.github, Icon: GitHub },
    { label: 'LinkedIn', value: 'mohammad-amara', href: CONTACT.linkedin, Icon: LinkedIn },
    { label: t(COPY.contact.cv), value: lang === 'fr' ? 'Français' : 'English', href: CONTACT.cv[lang], download: true, Icon: FileText },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-rule">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 md:py-32">
        <Reveal>
          <h2 id="contact-title" className="display text-[2rem] sm:text-[2.75rem]">
            {t(COPY.contact.title)}
          </h2>
          <p className="mt-3 max-w-md text-muted">{t(COPY.contact.sub)}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-16">
            <a
              href={`mailto:${CONTACT.email}`}
              className="display break-all text-[2.25rem] font-semibold tracking-[-0.035em] transition-colors hover:text-accent sm:text-[3.5rem] lg:text-[5rem]"
            >
              {CONTACT.email}
            </a>
            <button type="button" onClick={copy} className="btn btn-secondary btn-sm">
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              <span aria-live="polite">{copied ? t(COPY.contact.copied) : t(COPY.contact.copy)}</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-14 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <li key={c.href} className="border-b border-rule sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0">
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  download={c.download || undefined}
                  className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-surface/60 sm:px-6"
                >
                  <c.Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-fg" />
                  <span className="min-w-0 flex-1">
                    <span className="meta block text-muted">{c.label}</span>
                    <span className="mt-1 block truncate transition-colors group-hover:text-accent">{c.value}</span>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
