import { motion } from 'framer-motion'
import { COPY, SKILLS } from '@/lib/content'
import type { Skill } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

/** Larger tiles for the headline hardware skills: asymmetric bento. */
const BIG = new Set(['VHDL', 'PCB / Card Design'])

function SkillTile({ s, big }: { s: Skill; big: boolean }) {
  const hw = s.kind === 'hardware'
  return (
    <SpotlightCard
      spotlight={hw ? 'rgba(246,198,107,0.16)' : 'rgba(34,211,238,0.16)'}
      className={big ? 'sm:col-span-2' : ''}
    >
      <div className="flex h-full items-center justify-between gap-4 p-5">
        <div>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${hw ? 'text-[#f6c66b]' : 'text-accent'}`}
          >
            {hw ? 'Hardware' : 'Software'}
          </span>
          <h3 className={`mt-1 font-display font-bold ${big ? 'text-2xl' : 'text-lg'}`}>{s.name}</h3>
        </div>
        <span
          aria-hidden
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${hw ? 'bg-[#f6c66b]' : 'bg-accent'} opacity-70`}
        />
      </div>
    </SpotlightCard>
  )
}

export function Skills() {
  const { t } = useLang()
  // hardware first (design-forward), highlights get bigger tiles
  const ordered = [...SKILLS].sort((a, b) => (a.kind === b.kind ? b.level - a.level : a.kind === 'hardware' ? -1 : 1))

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      {/* asymmetric header, offset right */}
      <Reveal>
        <div className="mb-12 md:pl-[38%]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(COPY.skills.label)}</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t(COPY.skills.title)}
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted">{t(COPY.skills.sub)}</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={BIG.has(s.name) ? 'sm:col-span-2' : ''}
          >
            <SkillTile s={s} big={BIG.has(s.name)} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
