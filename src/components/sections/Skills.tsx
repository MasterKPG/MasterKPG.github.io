import { motion } from 'framer-motion'
import { COPY, SKILLS } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Marquee } from '@/components/ui/Marquee'

const rowA = SKILLS.filter((s) => s.kind === 'software')
const rowB = SKILLS.filter((s) => s.kind === 'hardware')

function Chip({ name, kind }: { name: string; kind: 'hardware' | 'software' }) {
  return (
    <div className="glass mx-2 flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5">
      <span
        className={`h-2 w-2 rounded-full ${
          kind === 'hardware'
            ? 'bg-gradient-to-br from-amber-300 to-orange-500'
            : 'bg-gradient-to-br from-aurora-cyan to-aurora-violet'
        }`}
      />
      <span className="whitespace-nowrap text-sm font-semibold">{name}</span>
    </div>
  )
}

export function Skills() {
  const { t } = useLang()
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-aurora-cyan">
            {t(COPY.skills.label)}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            {t(COPY.skills.title)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t(COPY.skills.sub)}</p>
        </Reveal>
      </div>

      {/* Rolling marquees */}
      <div className="mt-12 space-y-3">
        <Marquee>
          {rowA.concat(rowB.slice(0, 2)).map((s, i) => (
            <Chip key={`a-${i}`} name={s.name} kind={s.kind} />
          ))}
        </Marquee>
        <Marquee reverse>
          {rowB.map((s, i) => (
            <Chip key={`b-${i}`} name={s.name} kind={s.kind} />
          ))}
        </Marquee>
      </div>

      {/* Proficiency bars */}
      <div className="mx-auto mt-16 grid max-w-4xl gap-x-10 gap-y-5 px-6 sm:grid-cols-2">
        {SKILLS.map((s, i) => (
          <Reveal key={s.name} delay={(i % 6) * 0.05}>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="font-mono text-xs text-muted">{s.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[rgb(var(--fg))]/8">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full rounded-full ${
                    s.kind === 'hardware'
                      ? 'bg-gradient-to-r from-amber-300 to-orange-500'
                      : 'bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-violet'
                  }`}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
