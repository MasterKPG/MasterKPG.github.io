import type { ReactNode } from 'react'
import { useLang } from '@/lib/i18n'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Reveal } from '@/components/ui/Reveal'
import { CV, type CvEntry, type Rich } from './cv-data'

const UI = {
  title: { en: 'Curriculum vitae', fr: 'Curriculum vitae' },
  download: { en: 'Download PDF', fr: 'Télécharger le PDF' },
}

/** Renders plain text, or segments where some are links (projects open on the portfolio). */
function RichText({ value }: { value: Rich }) {
  const { t } = useLang()
  if (!Array.isArray(value)) return <>{t(value)}</>
  return (
    <>
      {value.map((seg, i) =>
        'href' in seg ? (
          <a
            key={i}
            href={seg.href}
            target={seg.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
          >
            {t(seg.text)}
          </a>
        ) : (
          <span key={i}>{t(seg)}</span>
        ),
      )}
    </>
  )
}

const plain = (value: Rich) =>
  Array.isArray(value) ? value.map((s) => ('href' in s ? s.text.en : s.en)).join('') : value.en

/** \section*: bold, \Large, with LaTeX's generous space above and tighter space below. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-[1.9em]">
      <h2 className="tex-big mb-[0.6em] text-[1.44em] font-bold leading-tight">{title}</h2>
      {children}
    </section>
  )
}

/** The \entry macro: bold title, then the place in italics with the dates flush right. */
function Entry({ e }: { e: CvEntry }) {
  const { t } = useLang()
  return (
    <div className="mt-[0.55em]">
      <p className="font-bold">
        <RichText value={e.title} />
      </p>
      <p className="flex flex-wrap justify-between gap-x-6">
        <i>
          <RichText value={e.org} />
        </i>
        {t(e.date) && <span>{t(e.date)}</span>}
      </p>
      {e.bullets && (
        <ul className="tex-itemize">
          {e.bullets.map((b) => (
            <li key={plain(b)}>
              <RichText value={b} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CvPage() {
  const { t, lang } = useLang()

  return (
    <>
      <ScrollProgress />
      <Nav base="../" current="cv" />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-32">
        <Reveal>
          <div className="tex-chrome flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t(UI.title)}</h1>
            <a
              href={`../${CV.pdf[lang]}`}
              download
              className="inline-flex h-10 items-center gap-2 rounded-md border border-line px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
              {t(UI.download)}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <article lang={lang} className="tex-paper card mt-12 px-5 py-10 sm:px-14 sm:py-14">
            <header className="text-center">
              <h2 className="tex-big text-[1.728em] font-bold leading-tight">{CV.name}</h2>
              <p className="tex-big mt-[0.35em] text-[1.2em]">{t(CV.headline)}</p>
              <div className="mt-[0.6em]">
                {CV.contact.map((line) => (
                  <p key={line[0].label} className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-[1.2em]">
                    {line.map((c, i) => (
                      <span key={c.label}>
                        {i > 0 && (
                          <span aria-hidden className="mr-[1.2em] hidden sm:inline">
                            ·
                          </span>
                        )}
                        {c.href ? (
                          <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                            {c.label}
                          </a>
                        ) : (
                          c.label
                        )}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </header>

            <Section title={t(CV.sections.summary)}>
              <p className="tex-justify">{t(CV.summary)}</p>
            </Section>

            <Section title={t(CV.sections.education)}>
              {CV.education.map((e) => (
                <Entry key={plain(e.title)} e={e} />
              ))}
            </Section>

            <Section title={t(CV.sections.experience)}>
              {CV.experience.map((e) => (
                <Entry key={plain(e.title) + e.date.en} e={e} />
              ))}
            </Section>

            <Section title={t(CV.sections.projects)}>
              {CV.projects.map((e) => (
                <Entry key={plain(e.title)} e={e} />
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
        </Reveal>
      </main>

      <div className="tex-chrome">
        <Footer base="../" />
      </div>
    </>
  )
}
