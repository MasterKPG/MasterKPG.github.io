import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Footer } from '@/components/sections/Footer'
import { CV, type CvEntry } from './cv-data'

const UI = {
  back: { en: 'Portfolio', fr: 'Portfolio' },
  download: { en: 'Download PDF', fr: 'Télécharger le PDF' },
}

/** \section*: bold, \Large, with LaTeX's generous space above and tighter space below. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-[1.9em] first:mt-[1.4em]">
      <h2 className="tex-big mb-[0.6em] text-[1.44em] font-bold leading-tight">{title}</h2>
      {children}
    </section>
  )
}

/** The \entry macro: bold title, then the place in italics with the dates flush right. */
function Entry({ e }: { e: CvEntry }) {
  const { t } = useLang()
  return (
    <div className="mt-[0.55em] first:mt-0">
      <p className="font-bold">{t(e.title)}</p>
      <p className="flex flex-wrap justify-between gap-x-6">
        <i>{t(e.org)}</i>
        {t(e.date) && <span>{t(e.date)}</span>}
      </p>
      {e.bullets && (
        <ul className="tex-itemize">
          {e.bullets.map((b) => (
            <li key={b.en}>{t(b)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CvPage() {
  const { t, lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'tex-chrome sticky top-0 z-50 border-b transition-colors duration-300',
          scrolled ? 'nav-solid' : 'border-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="CV">
          <a
            href="../"
            className="group flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[rgb(var(--fg))]"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Mohammad Amara
            <span className="hidden font-normal text-muted sm:inline">· {t(UI.back)}</span>
          </a>
          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              aria-label={lang === 'en' ? 'Passer en français' : 'Switch to English'}
              className="flex h-9 items-center rounded-md px-2.5 font-mono text-xs font-medium text-muted transition-colors hover:text-[rgb(var(--fg))]"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <ThemeToggle />
            <a
              href={`../${CV.pdf[lang]}`}
              download
              className="ml-2 inline-flex h-9 items-center gap-2 rounded-md border border-line px-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
              <span className="hidden sm:inline">{t(UI.download)}</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="px-3 pb-24 pt-6 sm:px-6 sm:pt-10">
        <article
          lang={lang}
          className="tex-paper mx-auto max-w-[52rem] rounded-sm px-5 py-10 shadow-[0_30px_80px_rgb(0_0_0/0.35)] sm:px-[3.4rem] sm:py-[3.6rem]"
        >
          <header className="text-center">
            <h1 className="tex-big text-[1.728em] font-bold leading-tight">{CV.name}</h1>
            <p className="tex-big mt-[0.35em] text-[1.2em]">{t(CV.headline)}</p>
            <p className="mx-auto mt-[0.6em] flex max-w-[40em] flex-wrap justify-center gap-x-[1.2em] gap-y-[0.15em]">
              {CV.contact.map((c, i) => (
                <span key={c.label}>
                  {i > 0 && <span aria-hidden className="mr-[1.2em]">·</span>}
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
                      {c.label}
                    </a>
                  ) : (
                    c.label
                  )}
                </span>
              ))}
            </p>
          </header>

          <Section title={t(CV.sections.summary)}>
            <p className="tex-justify">{t(CV.summary)}</p>
          </Section>

          <Section title={t(CV.sections.education)}>
            {CV.education.map((e) => (
              <Entry key={e.title.en} e={e} />
            ))}
          </Section>

          <Section title={t(CV.sections.experience)}>
            {CV.experience.map((e) => (
              <Entry key={e.title.en + e.date.en} e={e} />
            ))}
          </Section>

          <Section title={t(CV.sections.projects)}>
            {CV.projects.map((e) => (
              <Entry key={e.title.en} e={e} />
            ))}
          </Section>

          <Section title={t(CV.sections.skills)}>
            <dl className="grid grid-cols-1 gap-x-[1.2em] gap-y-[0.25em] sm:grid-cols-[auto_1fr]">
              {CV.skills.map((s) => (
                <div key={s.label.en} className="contents">
                  <dt className="font-bold">{t(s.label)}</dt>
                  <dd className="mb-[0.3em] sm:mb-0">{t(s.value)}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title={t(CV.sections.languages)}>
            <p>
              <b>{t(CV.languages.label)}</b>
              {lang === 'fr' ? ' : ' : ': '}
              {t(CV.languages.value)}
            </p>
            <p>
              <b>{t(CV.interests.label)}</b>
              {lang === 'fr' ? ' : ' : ': '}
              {t(CV.interests.value)}
            </p>
          </Section>
        </article>
      </main>

      <div className="tex-chrome">
        <Footer base="../" />
      </div>
    </>
  )
}
