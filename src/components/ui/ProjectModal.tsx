import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project, ProjectDoc } from '@/lib/content'
import { COPY } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { CoverImage } from './SmartMedia'

/** True when a HEAD request finds the file and it has the expected content type. */
async function exists(href: string, type: string) {
  try {
    const r = await fetch(href, { method: 'HEAD' })
    return r.ok && (r.headers.get('content-type') || '').includes(type)
  } catch {
    return false
  }
}

function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  )
}

/**
 * Project preview modal: cover/video, full description, tags, and links to the code,
 * the live site, the demo video and documents. Video and document links only render
 * when the file exists (probed via HEAD), so a missing file never becomes a dead link.
 */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { t } = useLang()
  const [hasVideo, setHasVideo] = useState(false)
  const [docs, setDocs] = useState<ProjectDoc[]>([])
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    let alive = true
    setHasVideo(false)
    setDocs([])
    if (project.video) {
      exists(project.video, 'video').then((ok) => alive && setHasVideo(ok))
    }
    if (project.docs?.length) {
      Promise.all(project.docs.map((d) => exists(d.href, 'pdf'))).then(
        (found) => alive && setDocs(project.docs!.filter((_, i) => found[i])),
      )
    }

    return () => {
      alive = false
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(project.title)}
            className="card-solid relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t(COPY.projects.close)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {hasVideo ? (
              <div className="relative aspect-[16/8] w-full bg-black">
                <video
                  src={project.video}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            ) : (
              project.cover && (
                <CoverImage src={project.cover} alt={t(project.title)} className="aspect-[16/8] w-full" />
              )
            )}

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide">
                {project.inProgress && (
                  <span className="rounded border border-accent/40 px-1.5 py-0.5 text-accent">
                    {t(COPY.projects.inProgress)}
                  </span>
                )}
                {project.period && <span className="text-muted">{t(project.period)}</span>}
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {t(project.title)}
              </h3>
              {project.role && <p className="mt-1 text-sm text-muted">{t(project.role)}</p>}
              <p className="mt-4 leading-relaxed text-muted">{t(project.description)}</p>

              {project.recognition && (
                <div className="mt-5 border-l-2 border-accent pl-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
                    {t(COPY.projects.recognition)}
                  </p>
                  <p className="mt-1 text-sm text-[rgb(var(--fg)/0.85)]">{t(project.recognition)}</p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={termKey(tag)} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
                    {t(tag)}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.demo && <LinkButton href={project.demo}>{t(COPY.projects.site)}</LinkButton>}
                {project.repo && <LinkButton href={project.repo}>{t(COPY.projects.code)}</LinkButton>}
                {hasVideo && <LinkButton href={project.video!}>{t(COPY.projects.watch)}</LinkButton>}
                {docs.map((d) => (
                  <LinkButton key={d.href} href={d.href}>
                    {t(d.label)}
                  </LinkButton>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
