import { useMemo, useState } from 'react'
import { COPY, PROJECTS, type Project } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { InteractiveFolderGallery, type GalleryPhoto } from '@/components/ui/interactive-folder-gallery'
import { ProjectModal } from '@/components/ui/ProjectModal'

export function Projects() {
  const { t, lang } = useLang()
  const [selected, setSelected] = useState<Project | null>(null)

  const photos: GalleryPhoto[] = useMemo(
    () =>
      PROJECTS.map((p) => ({
        id: p.id,
        image: p.cover,
        grad: p.grad,
        label: t(p.title),
        featured: p.featured,
        onOpen: () => setSelected(p),
      })),
    [t],
  )

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <h2 className="text-center font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          {t(COPY.projects.title)}
        </h2>
      </Reveal>

      {/* One folder holds every project: click to open, drag any card down to close */}
      <InteractiveFolderGallery
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
