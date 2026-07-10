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
import { FolderCard } from '@/components/ui/FolderCard'
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
      {/* asymmetric header */}
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(COPY.projects.label)}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
              {t(COPY.projects.title)}
            </h2>
          </div>
          <p className="max-w-xs font-serif text-xl italic text-muted md:text-right">
            {t(COPY.projects.sub)}
          </p>
        </div>
      </Reveal>

      {/* filter pills */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-2">
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
      </Reveal>

      {/* folder gallery */}
      <motion.div layout className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <FolderCard project={p} index={i} onOpen={() => setSelected(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
