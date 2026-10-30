import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AREAS, CATEGORY_LABELS, COPY, PROJECTS, type Project, type ProjectCategory } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { openProject, projectFromHash } from '@/lib/project-link'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { CoverImage } from '@/components/ui/SmartMedia'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons'
import { Develop, EASE, Rule } from '@/components/ui/motion'
import { ClusterPlot, IpcDiagram, SoliboxDiagram } from '@/components/ui/diagrams'

const FEATURED = PROJECTS.filter((p) => p.featured)
const INDEX = PROJECTS.filter((p) => !p.featured)

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}

/** The picture for a selected project: its cover, or a drawing when it has none. */
function Visual({ p }: { p: Project }) {
  const { t } = useLang()
  if (p.id === 'solibox') return <SoliboxDiagram />
  if (p.cover) return <CoverImage src={p.cover} alt={t(p.title)} className="h-full w-full" />
  return null
}

function Status({ p }: { p: Project }) {
  const { t } = useLang()
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {p.recognition && <span className="chip chip-accent">{t(COPY.work.award)}</span>}
      {p.inProgress && <span className="chip chip-accent">{t(COPY.work.inProgress)}</span>}
      {p.period && <span className="meta text-muted">{t(p.period)}</span>}
    </div>
  )
}

/** Story, facts, tags and links for one selected project. */
function Details({ p }: { p: Project }) {
  const { t } = useLang()
  return (
    <div>
      <Status p={p} />
      <h3 className="display mt-4 text-[1.75rem] sm:text-[2.25rem]">{t(p.title)}</h3>
      {p.role && <p className="mt-1 text-[15px] text-muted">{t(p.role)}</p>}
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">{t(p.blurb)}</p>
      {p.recognition && (
        <p className="mt-4 max-w-2xl border-l-2 border-accent pl-4 text-[15px] text-muted">{t(p.recognition)}</p>
      )}
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t(COPY.work.builtWith)}>
        {p.tags.slice(0, 6).map((tag) => (
          <li key={termKey(tag)} className="chip">
            {t(tag)}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap gap-2">
        <button type="button" onClick={() => openProject(p.id)} className="btn btn-primary btn-sm">
          {t(COPY.work.details)}
        </button>
        {p.demo && <ExternalLink href={p.demo}>{t(COPY.work.site)}</ExternalLink>}
        {p.links?.map((l) => (
          <ExternalLink key={l.href} href={l.href}>
            {t(l.label)}
          </ExternalLink>
        ))}
      </div>
    </div>
  )
}

/**
 * Selected work as one showcase: the projects are tabs on the left, the chosen one fills
 * the right with a large visual. Switching blurs the old visual out and the new one in.
 * Below lg the tabs give way to the projects stacked one after another.
 */
function Showcase() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const p = FEATURED[active]

  const onKey = (e: KeyboardEvent) => {
    const step =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (active + step + FEATURED.length) % FEATURED.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <>
      <div className="hidden gap-10 lg:grid lg:grid-cols-12">
        <div
          role="tablist"
          aria-label={t(COPY.work.tabs)}
          aria-orientation="vertical"
          onKeyDown={onKey}
          className="self-start lg:sticky lg:top-24 lg:col-span-4"
        >
          {FEATURED.map((f, i) => {
            const selected = i === active
            return (
              <button
                key={f.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                id={`tab-${f.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="showcase-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  'group relative block w-full border-b border-rule py-5 pl-5 pr-3 text-left transition-colors first:border-t',
                  selected ? 'bg-surface' : 'hover:bg-surface/50',
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="showcase-marker"
                    className="absolute inset-y-0 left-0 w-0.5 bg-accent"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'text-lg font-medium tracking-tight',
                      selected ? 'text-fg' : 'text-muted group-hover:text-fg',
                    )}
                  >
                    {t(f.title)}
                  </span>
                  {(f.recognition || f.inProgress) && (
                    <span className="chip chip-accent">
                      {t(f.recognition ? COPY.work.award : COPY.work.inProgress)}
                    </span>
                  )}
                </span>
                <span className="mt-1 line-clamp-2 block text-sm text-muted">{t(f.blurb)}</span>
              </button>
            )
          })}
        </div>

        <div id="showcase-panel" role="tabpanel" aria-labelledby={`tab-${p.id}`} className="lg:col-span-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-rule bg-surface">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={p.id}
                className="absolute inset-0"
                initial={{ opacity: 0, filter: 'blur(12px)', scale: 1.03 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(12px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Visual p={p} />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={p.id}
              className="mt-8"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Details p={p} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-16 lg:hidden">
        {FEATURED.map((f) => (
          <Reveal key={f.id}>
            <Develop className="aspect-[16/10] border border-rule bg-surface">
              <Visual p={f} />
            </Develop>
            <div className="mt-6">
              <Details p={f} />
            </div>
          </Reveal>
        ))}
      </div>
    </>
  )
}

/** The picture behind an area tile: a board photo, or a drawing for the ones without. */
function AreaArt({ id, image }: { id: ProjectCategory; image?: string }) {
  if (image) return <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
  return id === 'ml' ? <ClusterPlot /> : <IpcDiagram />
}

const TILE_SHAPE: Record<ProjectCategory, string> = {
  hardware: 'sm:col-span-2 lg:row-span-2',
  embedded: 'sm:col-span-2',
  software: 'sm:col-span-2 lg:col-span-1',
  ml: 'sm:col-span-2 lg:col-span-1',
}

/**
 * Every other project: four area tiles (a bento) that filter one scannable list.
 * Choosing the active tile again shows everything.
 */
function Index() {
  const { t } = useLang()
  const [filter, setFilter] = useState<ProjectCategory | null>(null)
  const shown = useMemo(() => (filter ? INDEX.filter((p) => p.categories.includes(filter)) : INDEX), [filter])
  const count = (c: ProjectCategory) => INDEX.filter((p) => p.categories.includes(c)).length

  return (
    <div className="mt-28 md:mt-36">
      <Reveal>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-12">
          <h3 className="display text-[1.75rem] sm:text-[2.25rem]">{t(COPY.work.index)}</h3>
          <p className="max-w-md text-muted md:text-right">{t(COPY.work.indexSub)}</p>
        </div>
      </Reveal>

      <div
        role="group"
        aria-label={t(COPY.work.filterBy)}
        className="mt-10 grid gap-3 sm:grid-cols-4 lg:auto-rows-[13rem]"
      >
        {AREAS.map((a, i) => {
          const on = filter === a.id
          return (
            <Develop key={a.id} delay={i * 0.08} className={cn('relative min-h-[12rem]', TILE_SHAPE[a.id])}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(on ? null : a.id)}
                className={cn(
                  'group relative block h-full w-full overflow-hidden rounded-md text-left',
                  'after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:ring-inset after:transition-shadow',
                  on ? 'after:ring-2 after:ring-accent' : 'after:ring-1 after:ring-rule hover:after:ring-rule-strong',
                )}
              >
                <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  <AreaArt id={a.id} image={a.image} />
                </span>
                {/* A long gradient from the bottom keeps the text readable without hiding the picture. */}
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-0',
                    a.image
                      ? 'bg-gradient-to-t from-black/85 via-black/35 to-transparent'
                      : 'bg-gradient-to-t from-bg via-bg/70 to-transparent',
                  )}
                />
                <span className={cn('absolute inset-x-0 bottom-0 p-5', a.image ? 'text-white' : 'text-fg')}>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-lg font-medium tracking-tight">{t(CATEGORY_LABELS[a.id])}</span>
                    <span className={cn('font-mono text-sm', a.image ? 'text-white/75' : 'text-muted')}>
                      {count(a.id)}
                    </span>
                  </span>
                  <span className={cn('mt-1 block text-sm leading-snug', a.image ? 'text-white/80' : 'text-muted')}>
                    {t(a.blurb)}
                  </span>
                </span>
              </button>
            </Develop>
          )
        })}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4" aria-live="polite">
        <p className="meta text-muted">
          {t(COPY.work.showing)}: {filter ? t(CATEGORY_LABELS[filter]) : t(COPY.work.all)} · {shown.length}
        </p>
        {filter && (
          <button
            type="button"
            onClick={() => setFilter(null)}
            className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            {t(COPY.work.clear)}
          </button>
        )}
      </div>
      <Rule className="mt-3" />

      <ul>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
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
      <Showcase />
      <Index />
      <ProjectModal project={selected} onClose={closeModal} />
    </Section>
  )
}
