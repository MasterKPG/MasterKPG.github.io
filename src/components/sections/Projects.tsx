import { useMemo, useState } from 'react'
import { COPY, PROJECTS, type Project } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { FanCardGallery, type FanCard } from '@/components/ui/fan-card-gallery'
import { ProjectModal } from '@/components/ui/ProjectModal'

export function Projects() {
  const { t } = useLang()
  const [selected, setSelected] = useState<Project | null>(null)

  const cards: FanCard[] = useMemo(
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

      <div className="mt-14">
        <FanCardGallery cards={cards} />
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
