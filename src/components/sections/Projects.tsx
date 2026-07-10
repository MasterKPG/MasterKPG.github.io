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
import { TiltCard } from '@/components/ui/TiltCard'
import { CoverImage } from '@/components/ui/SmartMedia'
import { ProjectModal } from '@/components/ui/ProjectModal'

const FILTERS: (ProjectCategory | 'all')[] = ['all', 'hardware', 'embedded', 'software', 'ml']

export function Projects() {
  const { t } = useLang()
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t(COPY.projects.label)}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{t(COPY.projects.title)}</h2>
        <p className="mt-4 max-w-xl text-muted">{t(COPY.projects.sub)}</p>
      </Reveal>

      {/* Filter pills */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f ? 'text-white' : 'glass text-muted hover:text-[rgb(var(--fg))]'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent-soft"
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                />
              )}
              {t(CATEGORY_LABELS[f])}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={p.featured ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <ProjectCard project={p} onOpen={() => setSelected(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t } = useLang()
  return (
    <TiltCard className="group relative h-full" maxTilt={6}>
      <button
        onClick={onOpen}
        className="glass relative flex h-full w-full flex-col overflow-hidden rounded-3xl text-left transition-shadow duration-500 hover:shadow-[0_24px_70px_rgba(34,197,94,0.18)]"
        data-cursor
      >
        <div className={`relative w-full overflow-hidden ${project.featured ? 'aspect-[16/7]' : 'aspect-[16/9]'}`}>
          <CoverImage
            src={project.cover}
            grad={project.grad}
            alt={t(project.title)}
            className="h-full w-full [&_img]:group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          {project.featured && (
            <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-white">
              ★ Featured
            </span>
          )}
          <span className="glass absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {t(COPY.projects.preview)} →
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold">{t(project.title)}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(project.blurb)}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/25 bg-accent/8 px-2.5 py-0.5 font-mono text-[11px] text-[rgb(var(--fg))]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
    </TiltCard>
  )
}
