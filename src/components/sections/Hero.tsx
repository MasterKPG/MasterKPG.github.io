import { motion } from 'framer-motion'
import { COPY, HERO_SHOTS, PROJECTS } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { openProject } from '@/lib/project-link'
import { ArrowRight } from '@/components/ui/icons'

const SHOTS = HERO_SHOTS.flatMap((id) => PROJECTS.filter((p) => p.id === id && p.cover))

/** Width over height of each board photo, so the strip keeps one shared height. */
const RATIO: Record<string, number> = {
  'saturating-accumulator': 1,
  'smart-garden': 16 / 9,
  'ping-pong': 16 / 9,
}

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="pb-20 pt-32 md:pb-28 md:pt-44">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <motion.button
          type="button"
          onClick={() => openProject('solibox')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="group inline-flex items-center gap-2.5 rounded-md border border-rule py-1.5 pl-2.5 pr-3 text-sm text-muted transition-colors hover:border-rule-strong hover:text-fg"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {t(COPY.hero.award)}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="display mt-6 max-w-[19ch] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.75rem]"
        >
          {t(COPY.hero.title)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease }}
          className="mt-4 max-w-xl text-lg text-muted"
        >
          {t(COPY.hero.sub)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a href="#projects" className="btn btn-primary">
            {t(COPY.hero.viewWork)}
          </a>
          <a href="#contact" className="btn btn-secondary">
            {t(COPY.nav.contact)}
          </a>
        </motion.div>
      </div>

      {/* Real boards from the projects, one shared height; each opens its project. */}
      <motion.ul
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.32, ease }}
        className="mx-auto mt-16 flex max-w-page snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:gap-4 sm:overflow-visible sm:px-8 md:mt-24"
      >
        {SHOTS.map((p) => (
          <li
            key={p.id}
            className="w-[82%] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:shrink sm:basis-0"
            style={{ flexGrow: RATIO[p.id] ?? 1, ['--r' as string]: RATIO[p.id] ?? 1 }}
          >
            <button type="button" onClick={() => openProject(p.id)} className="group block w-full text-left">
              <span className="block aspect-[4/3] overflow-hidden rounded-md bg-surface sm:aspect-[var(--r)]">
                <img
                  src={p.cover}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-4">
                <span className="truncate text-sm font-medium transition-colors group-hover:text-accent">
                  {t(p.title)}
                </span>
                <span className="meta hidden shrink-0 text-muted xl:inline">
                  {p.tags.slice(0, 2).map((x) => t(x)).join(' · ')}
                </span>
              </span>
            </button>
          </li>
        ))}
      </motion.ul>
    </section>
  )
}
