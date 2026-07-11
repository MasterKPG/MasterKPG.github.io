import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  COPY,
  PROJECTS,
  CATEGORY_LABELS,
  type Project,
  type ProjectCategory,
} from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { CoverImage } from '@/components/ui/SmartMedia'
import { ProjectModal } from '@/components/ui/ProjectModal'

const FILTERS: (ProjectCategory | 'all')[] = ['all', 'hardware', 'embedded', 'software', 'ml']

export function Projects() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(COPY.projects.label)}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
              {t(COPY.projects.title)}
            </h2>
          </div>
          <p className="max-w-xs text-lg text-muted md:text-right">{t(COPY.projects.sub)}</p>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {!open ? (
          /* ── CLOSED: one big interactive folder holding every project ── */
          <motion.div
            key="folder"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => setOpen(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              aria-expanded={false}
              aria-label={`${t(COPY.projects.title)} — ${PROJECTS.length}`}
              className="group/folder relative block w-full max-w-2xl text-left [perspective:1400px]"
            >
              <div className="relative mx-auto h-72 w-full sm:h-80">
                {/* back panel + tab */}
                <div className="absolute inset-x-0 bottom-0 top-8 rounded-3xl rounded-tl-none bg-gradient-to-b from-ink-700 to-ink-800 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
                  <span className="absolute -top-[30px] left-0 h-8 w-1/3 rounded-t-2xl bg-ink-700 ring-1 ring-white/5" />
                </div>

                {/* peeking project covers — fan gently on hover */}
                {PROJECTS.slice(0, 3).map((p, i) => {
                  const rest = `rotate(${(i - 1) * 2}deg) translateY(${i * -5}px)`
                  const fanned = `rotate(${(i - 1) * 4}deg) translate(${(i - 1) * 12}px, ${-16 - (i === 1 ? 6 : 0)}px)`
                  return (
                    <div
                      key={p.id}
                      className="absolute inset-x-14 bottom-16 top-16 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: hovered ? fanned : rest,
                        zIndex: 3 - i,
                      }}
                    >
                      <CoverImage src={p.cover} grad={p.grad} alt="" className="h-full w-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    </div>
                  )
                })}

                {/* front flap — stays above the fanned covers so the label reads */}
                <div className="absolute inset-x-0 bottom-0 top-24 z-[5] origin-bottom rounded-3xl bg-gradient-to-b from-ink-600/95 to-ink-700 ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover/folder:[transform:rotateX(-18deg)]">
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <p className="font-display text-2xl font-bold text-white">
                        {t(COPY.projects.title)}
                      </p>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wide text-white/50">
                        {PROJECTS.length} {lang === 'fr' ? 'projets' : 'projects'}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-ink-950 shadow-[0_8px_24px_-6px_rgba(34,211,238,0.6)] transition-transform group-hover/folder:scale-105">
                      {lang === 'fr' ? 'Ouvrir' : 'Open'}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        ) : (
          /* ── OPEN: cards fan out of the folder ── */
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      filter === f ? 'text-ink-950' : 'border border-white/10 text-muted hover:text-[rgb(var(--fg))]'
                    }`}
                  >
                    {filter === f && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      />
                    )}
                    {t(CATEGORY_LABELS[f])}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-[rgb(var(--fg))]"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                {lang === 'fr' ? 'Refermer' : 'Close folder'}
              </button>
            </div>

            <motion.div layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectCard project={p} onOpen={() => setSelected(p)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t } = useLang()
  return (
    <button
      onClick={onOpen}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-[rgb(var(--glass))]/40 text-left backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:border-accent/35 hover:shadow-[0_24px_60px_-24px_rgba(34,211,238,0.35)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <CoverImage
          src={project.cover}
          grad={project.grad}
          alt={t(project.title)}
          className="h-full w-full [&_img]:transition-transform [&_img]:duration-500 [&_img]:group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-950">
            ★ Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">
          {t(project.title)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(project.blurb)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
