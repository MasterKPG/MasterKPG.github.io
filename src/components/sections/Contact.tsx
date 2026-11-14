import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Develop, Magnetic, Rule, SPRING, Words } from '@/components/ui/motion'
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
    <section id="contact" aria-labelledby="contact-title" className="relative">
      <Rule />
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 md:py-28">
        {/* The closing bookend: heavy, tight type over a darkened board photo. The panel is
            dark in both themes so the white type always reads. */}
        <Develop className="relative bg-[#0b0f17]">
          <img
            src="assets/covers/smart-garden.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0b0f17] via-[#0b0f17]/85 to-[#0b0f17]/30" />
          <div className="relative px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <Reveal>
              <h2 id="contact-title" className="sr-only">
                {t(COPY.contact.title)}
              </h2>
              <p
                aria-hidden
                className="font-display text-[3rem] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-[5rem] lg:text-[7rem]"
              >
                <Words text={t(COPY.contact.heading)} />
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all text-[1.5rem] font-medium tracking-tight underline decoration-white/30 decoration-1 underline-offset-[6px] transition-colors hover:decoration-white sm:text-[2rem]"
                >
                  {CONTACT.email}
                </a>
                <Magnetic>
                  <button
                    type="button"
                    onClick={copy}
                    className="btn btn-sm border border-white/25 text-white hover:border-white/60 hover:bg-white/10"
                  >
                    {/* The icon swaps with a small pop, so the click is never in doubt. */}
                    <motion.span
                      key={copied ? 'done' : 'copy'}
                      initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={SPRING}
                      className="inline-flex"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                    <span aria-live="polite">{copied ? t(COPY.contact.copied) : t(COPY.contact.copy)}</span>
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </Develop>

        <Reveal delay={0.1}>
          <ul className="mt-6 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
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
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-300 ease-spring group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
