import type { Project } from '@/lib/content'
import { COPY } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { CoverImage } from './SmartMedia'

/**
 * Interactive folder — a manila-style folder that opens on hover to reveal the
 * project cover peeking out, then opens the preview modal on click.
 * (21st.dev @uithefactory/interactive-folder-gallery concept.)
 */
export function FolderCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const { t } = useLang()
  const num = String(index + 1).padStart(2, '0')

  return (
    <button
      onClick={onOpen}
      aria-label={t(project.title)}
      className="group/folder block w-full text-left [perspective:1200px]"
    >
      {/* folder stage */}
      <div className="relative h-56 w-full">
        {/* back panel + tab */}
        <div className="absolute inset-x-0 bottom-0 top-6 rounded-2xl rounded-tl-none bg-gradient-to-b from-ink-700 to-ink-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
          <span className="absolute -top-[22px] left-0 h-6 w-2/5 rounded-t-xl bg-ink-700 ring-1 ring-white/5" />
          <span className="absolute right-4 top-3 font-mono text-xs text-white/25">{num}</span>
        </div>

        {/* papers = the project cover, peeks up on hover */}
        <div className="absolute inset-x-4 bottom-3 top-9 overflow-hidden rounded-xl shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/folder:-translate-y-6">
          <CoverImage
            src={project.cover}
            grad={project.grad}
            alt={t(project.title)}
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {project.featured && (
            <span className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-950">
              ★ Featured
            </span>
          )}
        </div>

        {/* front flap — opens forward on hover */}
        <div
          className="absolute inset-x-0 bottom-0 top-16 origin-bottom rounded-2xl bg-gradient-to-b from-ink-600/95 to-ink-700 ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover/folder:[transform:rotateX(-38deg)]"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <span className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-white/45 transition-opacity duration-300 group-hover/folder:opacity-0">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            {t(COPY.projects.preview)}
          </span>
        </div>
      </div>

      {/* meta */}
      <div className="mt-4 px-1">
        <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover/folder:text-accent">
          {t(project.title)}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{t(project.blurb)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
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
