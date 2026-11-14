import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project, ProjectDoc } from '@/lib/content'
import { CATEGORY_LABELS, COPY } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { Thumb } from './thumbs'
import { EASE } from './motion'
import { ArrowUpRight, Close } from './icons'

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
    <a href={href} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}

/** Where the preview grows from: the clicked tile's centre, measured from the viewport's. */
export interface Origin {
  x: number
  y: number
}

/**
 * Project preview: video or picture, the full description, a short fact list, tags, and
 * links to the code, the live site, the demo video and documents. Video and document
 * links only render when the file exists (probed via HEAD), so a missing file never
 * becomes a dead link.
 */
export function ProjectModal({
  project,
  origin,
  onClose,
}: {
  project: Project | null
  origin?: Origin | null
  onClose: () => void
}) {
  const { t } = useLang()
  const [hasVideo, setHasVideo] = useState(false)
  const [docs, setDocs] = useState<ProjectDoc[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const opener = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Keep Tab inside the dialog.
      if (e.key === 'Tab' && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button, video[controls]')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    closeRef.current?.focus()

    let alive = true
    setHasVideo(false)
    setDocs([])
    if (project.video) {
      exists(project.video, 'video').then((ok) => alive && setHasVideo(ok))
    }
    if (project.docs?.length) {
      const list = project.docs
      Promise.all(list.map((d) => exists(d.href, 'pdf'))).then(
        (found) => alive && setDocs(list.filter((_, i) => found[i])),
      )
    }

    return () => {
      alive = false
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      opener?.focus?.()
    }
  }, [project, onClose])

  // Period, role and field read as one line under the title rather than a sparse table.
  const facts = project
    ? [
        project.period && t(project.period),
        project.role && t(project.role),
        project.categories.map((c) => t(CATEGORY_LABELS[c])).join(', '),
      ].filter(Boolean)
    : []

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-[rgb(var(--scrim)/0.55)] backdrop-blur-[3px]" onClick={onClose} aria-hidden />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="panel relative z-10 max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-b-none shadow-[0_24px_80px_rgb(0_0_0/0.35)] sm:max-h-[88vh] sm:rounded-b-card"
            // Opened from a tile, the preview grows out of that tile and shrinks back into it.
            initial={origin ? { opacity: 0, scale: 0.3, x: origin.x, y: origin.y } : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={
              origin
                ? { opacity: 0, scale: 0.3, x: origin.x, y: origin.y, transition: { duration: 0.28, ease: EASE } }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="sticky top-0 z-20 flex h-0 justify-end">
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label={t(COPY.work.close)}
                className="mr-3 mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-fg backdrop-blur-sm transition-colors hover:bg-surface-2"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>

            {hasVideo ? (
              <div className="aspect-video w-full bg-black">
                <video src={project.video} className="h-full w-full object-contain" controls autoPlay muted loop playsInline />
              </div>
            ) : (
              // The drawings play their move here without waiting for a hover.
              <div className="is-live aspect-video w-full">
                <Thumb p={project} alt={t(project.title)} />
              </div>
            )}

            <div className="p-6 sm:p-10">
              {project.inProgress && <span className="chip chip-accent mb-4">{t(COPY.work.inProgress)}</span>}
              <h3 id="project-title" className="display text-[1.75rem] sm:text-[2.25rem]">
                {t(project.title)}
              </h3>

              <p className="meta mt-2 text-muted">{facts.join(' · ')}</p>

              <p className="mt-6 border-t border-rule pt-6 leading-relaxed">{t(project.description)}</p>

              {project.recognition && (
                <div className="mt-6 border-l-2 border-accent pl-4">
                  <p className="meta text-accent">{t(COPY.work.recognition)}</p>
                  <p className="mt-1 text-[15px] text-muted">{t(project.recognition)}</p>
                </div>
              )}

              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={t(COPY.work.builtWith)}>
                {project.tags.map((tag) => (
                  <li key={termKey(tag)} className="chip">
                    {t(tag)}
                  </li>
                ))}
              </ul>

              {(project.demo || project.repo || project.links || hasVideo || docs.length > 0) && (
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {project.demo && <LinkButton href={project.demo}>{t(COPY.work.site)}</LinkButton>}
                  {project.repo && <LinkButton href={project.repo}>{t(COPY.work.code)}</LinkButton>}
                  {project.links?.map((l) => (
                    <LinkButton key={l.href} href={l.href}>
                      {t(l.label)}
                    </LinkButton>
                  ))}
                  {hasVideo && project.video && <LinkButton href={project.video}>{t(COPY.work.watch)}</LinkButton>}
                  {docs.map((d) => (
                    <LinkButton key={d.href} href={d.href}>
                      {t(d.label)}
                    </LinkButton>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
