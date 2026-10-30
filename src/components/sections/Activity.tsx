import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { COPY, CONTACT } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
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

// Activity levels in the site's blueprint blue, lightest to heaviest, per theme.
const PALETTE = {
  light: ['#d6e2ff', '#93b0f5', '#3f6fdc', '#1a3fa8'],
  dark: ['#17264a', '#24479a', '#4a7cf0', '#a3c0ff'],
}

// The chart reads its surface colours from these variables; map them to the site tokens.
const TOKENS = {
  '--color-background': 'rgb(var(--bg))',
  '--color-foreground': 'rgb(var(--fg))',
  '--color-border': 'rgb(var(--rule))',
  '--color-muted-foreground': 'rgb(var(--muted))',
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
    <Section id="activity" title={t(COPY.activity.title)} sub={t(COPY.activity.sub)} layout="stacked">
      <Reveal>
        {/* The chart draws its own frame around an inner frame; the outer one takes the page
            colour and loses its border, so it is not a card inside a card. The chart reads
            that colour to tint its empty days. */}
        <div style={TOKENS} className="[&>section]:!border-0 [&>section]:!p-0">
          <ContributionSkyline
            data={days}
            palette={PALETTE}
            defaultView="2d"
            locale={lang === 'fr' ? 'fr-FR' : 'en-US'}
            weekStart={lang === 'fr' ? 1 : 0}
            strings={lang === 'fr' ? SKYLINE_FR : undefined}
          />
        </div>
        <a href={CONTACT.github} target="_blank" rel="noreferrer" className="link mt-4 inline-block text-sm text-muted">
          github.com/{CONTACT.githubUser} <span aria-hidden>↗</span>
        </a>
      </Reveal>
    </Section>
  )
}
