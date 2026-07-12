import { useMemo, useState } from 'react'
import {
  COPY,
  PROJECTS,
  CATEGORY_LABELS,
  type Project,
  type ProjectCategory,
} from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { InteractiveFolderGallery, type GalleryPhoto } from '@/components/ui/interactive-folder-gallery'
import { ProjectModal } from '@/components/ui/ProjectModal'

const FILTERS: (ProjectCategory | 'all')[] = ['all', 'hardware', 'embedded', 'software', 'ml']

export function Projects() {
  const { t, lang } = useLang()
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  const photos: GalleryPhoto[] = useMemo(
    () =>
      visible.map((p) => ({
        id: p.id,
        image: p.cover,
        grad: p.grad,
        label: t(p.title),
        featured: p.featured,
        onOpen: () => setSelected(p),
      })),
    [visible, t],
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

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-accent text-ink-950'
                  : 'border border-white/10 text-muted hover:text-[rgb(var(--fg))]'
              }`}
            >
              {t(CATEGORY_LABELS[f])}
            </button>
          ))}
        </div>
      </Reveal>

      {/* One folder holds every (filtered) project — click to open, drag any card down to close */}
      <InteractiveFolderGallery
        key={filter}
        photos={photos}
        folderName={lang === 'fr' ? `Projets (${photos.length})` : `Projects (${photos.length})`}
        dragHintText={
          lang === 'fr' ? 'Glissez une carte vers le bas pour refermer' : 'Drag any card down to close'
        }
      />

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
