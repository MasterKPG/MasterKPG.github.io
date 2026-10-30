import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { ArrowUp, GitHub, LinkedIn } from '@/components/ui/icons'
import { Mark } from '@/components/ui/Mark'

/**
 * A short footer for a short site: the mark and the few page links centred, the two
 * profiles as logos under them, then the copyright on the left and the way back up on
 * the right.
 */
export function Footer({ base = '' }: { base?: string }) {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const links = [
    { label: t(COPY.nav.work), href: `${base}#projects` },
    { label: t(COPY.nav.about), href: `${base}#about` },
    { label: t(COPY.nav.experience), href: `${base}#experience` },
    { label: t(COPY.nav.contact), href: `${base}#contact` },
    { label: t(COPY.nav.cv), href: `${base}cv/` },
  ]

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-page flex-col items-center px-5 pb-8 pt-16 sm:px-8">
        <Mark className="h-8 w-8" />
        <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[15px]">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-2">
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <GitHub className="h-5 w-5" />
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <LinkedIn className="h-5 w-5" />
          </a>
        </div>
        <div className="mt-14 flex w-full flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 text-sm text-muted">
          <p>
            © {year} Mohammad Amara · {t(COPY.footer.role)}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            {t(COPY.footer.toTop)}
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
