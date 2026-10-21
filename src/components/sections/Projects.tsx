import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { COPY, PROJECTS, type Project } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CoverImage } from '@/components/ui/SmartMedia'
import { FanCardGallery, type FanCard } from '@/components/ui/fan-card-gallery'
import GlassFolder, { type ArtRecipe, type FolderFile } from '@/components/ui/glass-folder'
import { ProjectModal } from '@/components/ui/ProjectModal'

const byGroup = (g: Project['group']) => PROJECTS.filter((p) => p.group === g)
const FEATURED = byGroup('featured')
const HARDWARE = byGroup('hardware')

// Folder artwork in the site palette: graphite folding into cyan.
const ART: Record<'software' | 'other', ArtRecipe> = {
  software: {
    style: 'streak',
    colors: ['#0b0d10', '#12303a', '#0e7490', '#22d3ee', '#a5f3fc', '#e6fbff'],
    scale: 0.7,
    warp: 1.5,
    angle: -0.6,
    gloss: 0.2,
  },
  other: {
    style: 'marble',
    colors: ['#07090c', '#16252c', '#2b6f7e', '#1a1d22', '#0891b2', '#67e8f9', '#ecfeff'],
    scale: 0.7,
    warp: 3.2,
    angle: 0.9,
    gloss: 0.45,
    veins: 0.4,
  },
}

function SubHeading({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <Reveal>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{children}</h3>
        {hint && <p className="text-sm text-muted">{hint}</p>}
      </div>
    </Reveal>
  )
}

function FeaturedCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const { t } = useLang()
  return (
    <button
      type="button"
      onClick={onOpen}
      className="card group flex h-full w-full flex-col overflow-hidden text-left transition-colors hover:border-accent/40"
    >
      {p.cover && <CoverImage src={p.cover} alt="" className="aspect-[16/9] w-full" />}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide">
          {p.inProgress && (
            <span className="rounded border border-accent/40 px-1.5 py-0.5 text-accent">
              {t(COPY.projects.inProgress)}
            </span>
          )}
          {p.period && <span className="text-muted">{t(p.period)}</span>}
        </div>
        <h4 className="mt-3 font-display text-xl font-semibold tracking-tight">{t(p.title)}</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t(p.blurb)}</p>
        {p.recognition && (
          <p className="mt-3 border-l-2 border-accent pl-3 text-sm text-[rgb(var(--fg)/0.85)]">
            {t(p.recognition)}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.tags.slice(0, 4).map((tag) => (
            <span key={termKey(tag)} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {t(tag)}
            </span>
          ))}
        </div>
        <span className="mt-5 text-sm font-medium text-accent">
          {t(COPY.projects.details)}{' '}
          <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </button>
  )
}

/** Folder width that fits the viewport with the section's side padding. */
function useFolderWidth() {
  const get = () => Math.min(340, Math.max(260, window.innerWidth - 48))
  const [width, setWidth] = useState(get)
  useEffect(() => {
    const onResize = () => setWidth(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return width
}

export function Projects() {
  const { t, lang } = useLang()
  const { theme } = useTheme()
  const [selected, setSelected] = useState<Project | null>(null)
  const folderWidth = useFolderWidth()

  const cards: FanCard[] = useMemo(
    () =>
      HARDWARE.map((p) => ({
        id: p.id,
        image: p.cover,
        label: t(p.title),
        onOpen: () => setSelected(p),
      })),
    [t],
  )

  const folders = (['software', 'other'] as const).map((group) => {
    const projects = byGroup(group)
    const files: FolderFile[] = projects.map((p) => ({ name: t(p.title), meta: t(p.tags[0]) }))
    return { group, projects, files }
  })

  const folderStrings =
    lang === 'fr'
      ? { open: 'Ouvrir', close: 'Fermer', item: 'projet', items: 'projets', contents: 'contenu' }
      : { open: 'Open', close: 'Close', item: 'project', items: 'projects', contents: 'contents' }

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="04" label={t(COPY.projects.label)} />

      <div className="mt-14">
        <SubHeading>{t(COPY.projects.featured)}</SubHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURED.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} className="h-full">
              <FeaturedCard p={p} onOpen={() => setSelected(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <SubHeading>{t(COPY.projects.hardware)}</SubHeading>
        <FanCardGallery cards={cards} />
      </div>

      <div className="mt-20">
        <SubHeading hint={t(COPY.projects.moreHint)}>{t(COPY.projects.more)}</SubHeading>
        <div className="flex flex-wrap justify-center gap-x-14 gap-y-10 pt-20">
          {folders.map(({ group, projects, files }, i) => (
            // Remount on language change: the folder reads its file list once.
            <GlassFolder
              key={`${group}-${lang}`}
              label={t(COPY.projects[group])}
              files={files}
              tone={theme === 'dark' ? 'dark' : 'light'}
              art={ART[group]}
              width={folderWidth}
              appearDelay={i * 120}
              strings={folderStrings}
              onFileSelect={(_, index) => setSelected(projects[index])}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
