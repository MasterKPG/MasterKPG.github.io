import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import HalftoneWordmarkFooter from '@/components/ui/halftone-footer'

// Dot colours per theme; the warm colour is the accent the dots pick up when pushed.
const PALETTES = {
  dark: { background: '#121417', ink: '#dfe5ea', warm: '#22d3ee' },
  light: { background: '#e9eef1', ink: '#151b21', warm: '#0891b2' },
}

export function Footer({ base = '' }: { base?: string }) {
  const { t } = useLang()
  const { theme } = useTheme()
  const year = new Date().getFullYear()

  return (
    <HalftoneWordmarkFooter
      wordmark="Amara"
      label="Mohammad Amara"
      meta={`© ${year} · ${t(COPY.footer.role)}`}
      palette={PALETTES[theme]}
      fontFamily='"Geist", system-ui, sans-serif'
      monoFamily='"Geist Mono", ui-monospace, monospace'
      height="clamp(420px, 44vw, 600px)"
      backToTopLabel={t(COPY.footer.toTop)}
      columns={[
        {
          title: t(COPY.footer.navigate),
          links: [
            { label: t(COPY.nav.about), href: `${base}#about` },
            { label: t(COPY.nav.experience), href: `${base}#experience` },
            { label: t(COPY.nav.projects), href: `${base}#projects` },
            { label: t(COPY.nav.contact), href: `${base}#contact` },
          ],
        },
        {
          title: t(COPY.footer.elsewhere),
          links: [
            { label: 'GitHub', href: CONTACT.github, external: true },
            { label: 'LinkedIn', href: CONTACT.linkedin, external: true },
            { label: 'Email', href: `mailto:${CONTACT.email}` },
          ],
        },
        {
          title: t(COPY.footer.documents),
          links: [{ label: t(COPY.nav.cv), href: `${base}cv/` }],
        },
      ]}
    />
  )
}
