import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORY_LABELS, COPY, PROJECTS, type Project, type ProjectCategory } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { openProject, projectFromHash } from '@/lib/project-link'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { CoverImage } from '@/components/ui/SmartMedia'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons'

const [LEAD, ...FEATURED] = PROJECTS.filter((p) => p.featured)
const INDEX = PROJECTS.filter((p) => !p.featured)
const FILTERS: ProjectCategory[] = ['hardware', 'embedded', 'software', 'ml']

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn('btn btn-secondary btn-sm', className)}>
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}

function Status({ p }: { p: Project }) {
  const { t } = useLang()
  if (!p.inProgress && !p.period) return null
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {p.inProgress && <span className="chip chip-accent">{t(COPY.work.inProgress)}</span>}
      {p.period && <span className="meta text-muted">{t(p.period)}</span>}
    </div>
  )
}

/** The award-winning project, set as a spec sheet: story on the left, facts on the right. */
function Lead({ p }: { p: Project }) {
  const { t } = useLang()
  return (
    <Reveal>
      <article className="panel grid overflow-hidden lg:grid-cols-12">
        <div className="p-6 sm:p-10 lg:col-span-7">
          <Status p={p} />
          <h3 className="display mt-5 text-[2rem] sm:text-[2.5rem]">{t(p.title)}</h3>
          {p.role && <p className="mt-2 text-[15px] text-muted">{t(p.role)}</p>}
          <p className="mt-6 max-w-xl text-lg leading-relaxed">{t(p.blurb)}</p>
          {p.recognition && (
            <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 text-[15px] text-muted">{t(p.recognition)}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-2">
            <button type="button" onClick={() => openProject(p.id)} className="btn btn-primary btn-sm">
              {t(COPY.work.details)}
            </button>
            {p.links?.map((l) => (
              <ExternalLink key={l.href} href={l.href}>
                {t(l.label)}
              </ExternalLink>
            ))}
          </div>
        </div>
        {p.specs && (
          <dl className="border-t border-rule bg-bg/40 p-6 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
            {p.specs.map((s) => (
              <div key={s.label.en} className="border-b border-rule py-4 first:pt-0 last:border-0 last:pb-0">
                <dt className="meta text-muted">{t(s.label)}</dt>
                <dd className="mt-1">{t(s.value)}</dd>
              </div>
            ))}
          </dl>
        )}
      </article>
    </Reveal>
  )
}

function Card({ p, delay }: { p: Project; delay: number }) {
  const { t } = useLang()
  return (
    <Reveal delay={delay} className="h-full">
      {/* The title button stretches over the whole card, so the card is one target; the
          live-site link sits above it. */}
      <article className="group relative flex h-full flex-col">
        {p.cover && (
          <CoverImage
            src={p.cover}
            alt=""
            className="aspect-video rounded-md border border-rule"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        )}
        <div className="mt-5 flex flex-1 flex-col">
          <Status p={p} />
          <h3 className="mt-3 flex items-center justify-between gap-4 text-xl font-medium tracking-tight">
            <button
              type="button"
              onClick={() => openProject(p.id)}
              className="text-left transition-colors after:absolute after:inset-0 after:rounded-md group-hover:text-accent"
            >
              {t(p.title)}
            </button>
            <ArrowRight
              className="h-5 w-5 shrink-0 -translate-x-1 text-accent opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(p.blurb)}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t(COPY.work.builtWith)}>
            {p.tags.slice(0, 4).map((tag) => (
              <li key={termKey(tag)} className="chip">
                {t(tag)}
              </li>
            ))}
          </ul>
          {p.demo && (
            <div className="relative z-10 mt-auto pt-5">
              <ExternalLink href={p.demo}>{t(COPY.work.site)}</ExternalLink>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

/** Every other project as one scannable list, filtered by category. */
function Index() {
  const { t } = useLang()
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const shown = useMemo(
    () => (filter === 'all' ? INDEX : INDEX.filter((p) => p.categories.includes(filter))),
    [filter],
  )
  const count = (c: ProjectCategory | 'all') =>
    c === 'all' ? INDEX.length : INDEX.filter((p) => p.categories.includes(c)).length

  return (
    <div className="mt-24 md:mt-32">
      <Reveal>
        <div className="flex flex-col gap-6 border-b border-rule pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-2xl font-medium tracking-tight">{t(COPY.work.index)}</h3>
            <p className="mt-1 text-muted">{t(COPY.work.indexSub)}</p>
          </div>
          <div role="group" aria-label={t(COPY.work.filterBy)} className="flex flex-wrap gap-2">
            {(['all', ...FILTERS] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={cn(
                  'inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors',
                  filter === c
                    ? 'border-fg bg-fg text-bg'
                    : 'border-rule text-muted hover:border-rule-strong hover:text-fg',
                )}
              >
                {c === 'all' ? t(COPY.work.all) : t(CATEGORY_LABELS[c])}
                <span className={cn('font-mono text-xs', filter === c ? 'text-bg/70' : 'text-muted/80')}>{count(c)}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <ul aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-rule"
            >
              <button
                type="button"
                onClick={() => openProject(p.id)}
                className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 text-left transition-colors hover:bg-surface/60 md:grid-cols-[11rem_1fr_15rem_1rem] md:px-3"
              >
                <span className="meta order-2 col-span-2 text-muted md:order-none md:col-span-1">
                  {p.categories.map((c) => t(CATEGORY_LABELS[c])).join(', ')}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium transition-colors group-hover:text-accent">{t(p.title)}</span>
                    {p.period && <span className="meta text-muted">{t(p.period)}</span>}
                    {p.inProgress && <span className="chip chip-accent">{t(COPY.work.inProgress)}</span>}
                    {p.video && <span className="chip">{t(COPY.work.video)}</span>}
                  </span>
                  <span className="mt-1 block text-[15px] text-muted">{t(p.blurb)}</span>
                </span>
                <span className="meta hidden text-muted md:block">
                  {p.tags.slice(0, 3).map((x) => t(x)).join(', ')}
                </span>
                <ArrowRight className="row-start-1 h-4 w-4 self-center text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent md:row-auto" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export function Projects() {
  const { t } = useLang()
  const [selected, setSelected] = useState<Project | null>(null)

  // #project-<id> opens that project's preview: links on this page, the CV page and
  // shared links all go through the hash.
  useEffect(() => {
    const openFromHash = () => {
      const id = projectFromHash()
      const p = PROJECTS.find((x) => x.id === id)
      if (p) setSelected(p)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const closeModal = useCallback(() => {
    setSelected(null)
    // Drop the hash so the same link opens the preview again.
    if (projectFromHash()) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  return (
    <Section id="projects" title={t(COPY.work.title)} sub={t(COPY.work.sub)} layout="stacked">
      {LEAD && <Lead p={LEAD} />}

      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
        {FEATURED.map((p, i) => (
          <Card key={p.id} p={p} delay={i * 0.06} />
        ))}
      </div>

      <Index />

      <ProjectModal project={selected} onClose={closeModal} />
    </Section>
  )
}
