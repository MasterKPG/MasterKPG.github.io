import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/lib/content'
import { COPY } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { CoverImage } from './SmartMedia'
import { LiquidLink } from './LiquidButton'

/**
 * Project preview modal — cover/video, full description, tags, and links to
 * demo video and documents. Video/doc links only render when the file exists
 * (probed via HEAD); otherwise a "coming soon" note is shown.
 */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { t } = useLang()
  const [hasVideo, setHasVideo] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    // Probe whether a real video was dropped in.
    let alive = true
    setHasVideo(false)
    if (project.video) {
      fetch(project.video, { method: 'HEAD' })
        .then((r) => {
          if (alive && r.ok && (r.headers.get('content-type') || '').includes('video')) {
            setHasVideo(true)
          }
        })
        .catch(() => {})
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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(project.title)}
            className="glass-strong relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t(COPY.projects.close)}
              className="glass absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-lg hover:scale-105"
            >
              ✕
            </button>

            <div className="relative aspect-[16/8] w-full">
              {hasVideo ? (
                <video
                  src={project.video}
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <CoverImage
                  src={project.cover}
                  grad={project.grad}
                  alt={t(project.title)}
                  className="h-full w-full"
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{t(project.title)}</h3>
              <p className="mt-3 leading-relaxed text-muted">{t(project.description)}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-3 py-1 font-mono text-xs text-[rgb(var(--fg))]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {hasVideo && (
                  <LiquidLink href={project.video} target="_blank" rel="noreferrer" variant="glass">
                    ▶ {t(COPY.projects.watch)}
                  </LiquidLink>
                )}
                {project.docs?.map((d) => (
                  <LiquidLink key={d.href} href={d.href} target="_blank" rel="noreferrer" variant="glass">
                    📄 {t(d.label)}
                  </LiquidLink>
                ))}
                {!hasVideo && !project.docs?.length && (
                  <span className="font-mono text-xs text-muted/70">{t(COPY.projects.soon)}</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
