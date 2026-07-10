import { CONTACT } from '@/lib/content'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <span className="font-display text-sm font-bold text-gradient">Mohammad Amara</span>
        <div className="flex items-center gap-5 text-sm text-muted">
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">
            Email
          </a>
        </div>
        <span className="font-mono text-xs text-muted/70">© {year} · Built with React</span>
      </div>
    </footer>
  )
}
