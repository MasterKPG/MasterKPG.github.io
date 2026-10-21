import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ContributionSkyline, {
  type ContributionDay,
  type SkylineStrings,
} from '@/components/ui/contribution-skyline'

const SKYLINE_FR: Partial<SkylineStrings> = {
  unit: 'contribution',
  unitPlural: 'contributions',
  lastYear: 'sur la dernière année',
  total: 'Total sur 1 an',
  busiest: 'Jour le plus actif',
  longest: 'Plus longue série',
  current: 'Série en cours',
  day: 'jour',
  days: 'jours',
  none: 'Aucune contribution',
  on: 'le',
  to: 'au',
  between: 'entre le',
  levels: ['Faible', 'Moyenne', 'Forte', 'Très forte'],
  hintFlat: 'Survolez un jour pour le détail · flèches pour explorer',
  hintOrbit: 'Glissez pour tourner · double-clic pour recentrer',
  less: 'Moins',
  more: 'Plus',
  highlight: (level) => 'Mettre en évidence : ' + level.toLowerCase(),
  view: 'Vue du graphique',
  flat: 'Carte de chaleur',
  skyline: 'Relief 3D',
  shownAs: (view) => ', affichées en ' + view.toLowerCase() + '. Les flèches permettent de lire chaque jour.',
}

// Activity levels in the site's cyan, lightest to heaviest, per theme.
const PALETTE = {
  light: ['#a5f3fc', '#22d3ee', '#0891b2', '#155e75'],
  dark: ['#0e3a44', '#0e7490', '#06b6d4', '#67e8f9'],
}

// The chart reads its surface colours from these variables; map them to the site tokens.
const TOKENS = {
  '--color-background': 'rgb(var(--bg-elevated))',
  '--color-foreground': 'rgb(var(--fg))',
  '--color-border': 'rgb(var(--line) / 0.1)',
  '--color-muted-foreground': 'rgb(var(--fg-muted))',
} as CSSProperties

/**
 * Public GitHub activity. The data is written to /contributions.json at build time by
 * scripts/fetch-contributions.mjs; when the file is missing the section is not shown.
 */
export function Activity() {
  const { t, lang } = useLang()
  const [days, setDays] = useState<ContributionDay[] | null>(null)

  useEffect(() => {
    let alive = true
    fetch('contributions.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (alive && Array.isArray(json?.days) && json.days.length) setDays(json.days)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  if (!days) return null

  return (
    <section id="activity" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader
        index="05"
        label={t(COPY.activity.label)}
        title={t(COPY.activity.title)}
        sub={t(COPY.activity.sub)}
      />
      <Reveal delay={0.1} className="mt-12">
        <div style={TOKENS}>
          <ContributionSkyline
            data={days}
            palette={PALETTE}
            locale={lang === 'fr' ? 'fr-FR' : 'en-US'}
            weekStart={lang === 'fr' ? 1 : 0}
            strings={lang === 'fr' ? SKYLINE_FR : undefined}
          />
        </div>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
        >
          github.com/{CONTACT.githubUser} <span aria-hidden>↗</span>
        </a>
      </Reveal>
    </section>
  )
}
