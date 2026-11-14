import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { CATEGORY_LABELS, COPY, PROJECTS, type Project, type ProjectCategory } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { openProject, projectFromHash } from '@/lib/project-link'
import { cn } from '@/lib/utils'
import { Section } from '@/components/ui/Section'
import { ProjectModal, type Origin } from '@/components/ui/ProjectModal'
import { ArrowUpRight, Play } from '@/components/ui/icons'
import { EASE, SPRING } from '@/components/ui/motion'
import { Thumb } from '@/components/ui/thumbs'

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProjectCategory[]

/* The grid order: one large tile, then four small ones, and again. With four columns
   that makes a band per large tile, and the large tile changes side on each band. */
const BIG = PROJECTS.filter((p) => p.featured)
const SMALL = PROJECTS.filter((p) => !p.featured)
const ORDER: Project[] = BIG.flatMap((p, i) => [p, ...SMALL.slice(i * 4, i * 4 + 4)]).concat(
  SMALL.slice(BIG.length * 4),
)

/** One project: its picture and its name. The whole tile opens the preview. */
function Tile({ p, onOpen }: { p: Project; onOpen: (p: Project, e: MouseEvent) => void }) {
  const { t } = useLang()
  const big = !!p.featured
  const status = p.recognition ? COPY.work.award : p.inProgress ? COPY.work.inProgress : null

  return (
    <button
      type="button"
      onClick={(e) => onOpen(p, e)}
      className="group flex h-full w-full flex-col rounded-card text-left"
    >
      <span className="relative block min-h-0 w-full flex-1 transition-transform duration-500 ease-spring group-hover:-translate-y-1.5 group-active:translate-y-0 group-active:scale-[0.985]">
        <span className="absolute inset-0 overflow-hidden rounded-card bg-surface ring-1 ring-inset ring-rule transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-18px_rgb(var(--scrim)/0.55)] group-hover:ring-rule-strong">
          <Thumb p={p} />
        </span>
        {status && (
          <span
            className={cn(
              'absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none',
              p.recognition ? 'bg-accent text-on-accent' : 'bg-bg/85 text-fg backdrop-blur-sm',
            )}
          >
            {!p.recognition && (
              <span className="h-1.5 w-1.5 animate-[blink_1.6s_ease-in-out_infinite] rounded-full bg-accent" aria-hidden />
            )}
            {t(status)}
          </span>
        )}
        {p.video && (
          <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg/85 text-fg backdrop-blur-sm">
            <Play className="h-3.5 w-3.5" />
            <span className="sr-only">{t(COPY.work.video)}</span>
          </span>
        )}
      </span>
      <span className="flex h-12 shrink-0 items-center justify-between gap-3 px-1">
        <span
          className={cn(
            'line-clamp-2 font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent',
            big ? 'text-lg sm:text-xl' : 'text-[15px]',
          )}
        >
          {t(p.title)}
        </span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 -translate-x-1 translate-y-1 text-accent opacity-0 transition duration-300 ease-spring group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        />
      </span>
    </button>
  )
}

export function Projects() {
  const { t } = useLang()
  const [filter, setFilter] = useState<ProjectCategory | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [origin, setOrigin] = useState<Origin | null>(null)
  // Where the last clicked tile sits, so the preview can grow out of it.
  const clicked = useRef<{ id: string; origin: Origin } | null>(null)

  const shown = useMemo(() => (filter ? ORDER.filter((p) => p.categories.includes(filter)) : ORDER), [filter])
  const count = (c: ProjectCategory) => PROJECTS.filter((p) => p.categories.includes(c)).length

  // #project-<id> opens that project's preview: links on this page, the CV page and
  // shared links all go through the hash.
  useEffect(() => {
    const openFromHash = () => {
      const id = projectFromHash()
      const p = PROJECTS.find((x) => x.id === id)
      if (!p) return
      const c = clicked.current
      setOrigin(c && c.id === id ? c.origin : null)
      clicked.current = null
      setSelected(p)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const open = useCallback((p: Project, e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    clicked.current = {
      id: p.id,
      origin: { x: r.left + r.width / 2 - window.innerWidth / 2, y: r.top + r.height / 2 - window.innerHeight / 2 },
    }
    openProject(p.id)
  }, [])

  const closeModal = useCallback(() => {
    setSelected(null)
    // Drop the hash so the same link opens the preview again.
    if (projectFromHash()) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  const pills: { id: ProjectCategory | null; label: string; n: number }[] = [
    { id: null, label: t(COPY.work.all), n: PROJECTS.length },
    ...CATEGORIES.map((c) => ({ id: c, label: t(CATEGORY_LABELS[c]), n: count(c) })),
  ]

  // Large tiles swap sides band after band, but only while the full grid is shown.
  let bigSeen = 0

  return (
    <Section id="projects" title={t(COPY.work.title)} layout="stacked">
      <LayoutGroup id="projects">
        <div role="group" aria-label={t(COPY.work.filterBy)} className="-mx-1 flex flex-wrap gap-1">
          {pills.map((pill) => {
            const on = filter === pill.id
            return (
              <button
                key={pill.id ?? 'all'}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(pill.id)}
                className={cn(
                  'relative flex h-10 items-center gap-2 rounded-full px-4 text-[15px] font-medium transition-colors duration-300',
                  on ? 'text-on-accent' : 'text-muted hover:text-fg',
                )}
              >
                {on && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={SPRING}
                  />
                )}
                <span className="relative">{pill.label}</span>
                <span className={cn('meta relative', on ? 'opacity-80' : 'opacity-70')}>{pill.n}</span>
              </button>
            )
          })}
        </div>

        <ul className="mt-8 grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-x-4 gap-y-3 sm:auto-rows-[13.5rem] sm:gap-x-5 lg:auto-rows-[14.5rem] lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => {
              const big = !!p.featured
              const right = big && !filter && bigSeen++ % 2 === 1
              return (
                <motion.li
                  key={p.id}
                  layout="position"
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    layout: { duration: 0.5, ease: EASE },
                    default: { duration: 0.6, delay: (i % 4) * 0.06, ease: EASE },
                  }}
                  className={cn(big && 'col-span-2 row-span-2', right && 'lg:col-start-3')}
                >
                  <Tile p={p} onOpen={open} />
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      </LayoutGroup>

      <ProjectModal project={selected} origin={origin} onClose={closeModal} />
    </Section>
  )
}
