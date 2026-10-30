import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { COPY, HERO_SHOTS, PROJECTS, type Project } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { openProject } from '@/lib/project-link'
import { cn } from '@/lib/utils'
import { ArrowRight } from '@/components/ui/icons'
import { EASE } from '@/components/ui/motion'

const SHOTS = HERO_SHOTS.flatMap((id) => PROJECTS.filter((p) => p.id === id && p.cover))

/* Where each board sits in the collage. The main photo is the largest and in front of
   the one behind it; the third overlaps its corner. Small tilts keep it from reading as
   a grid, and nothing is tilted far enough to look random. */
const LAYOUT: Record<string, { box: string; tilt: number; z: string; ratio: string; label: string }> = {
  'saturating-accumulator': {
    box: 'right-0 top-[9%] w-[70%]',
    tilt: 0,
    z: 'z-10',
    ratio: 'aspect-square',
    label: 'right-2 top-2',
  },
  'smart-garden': {
    box: 'left-0 top-0 w-[58%]',
    tilt: -2.5,
    z: 'z-0',
    ratio: 'aspect-video',
    label: 'bottom-2 left-2',
  },
  'ping-pong': {
    box: 'bottom-0 left-[3%] w-[60%]',
    tilt: 1.5,
    z: 'z-20',
    ratio: 'aspect-video',
    label: 'bottom-2 left-2',
  },
}

function Shot({ p, delay }: { p: Project; delay: number }) {
  const { t } = useLang()
  const l = LAYOUT[p.id]
  return (
    <motion.button
      type="button"
      onClick={() => openProject(p.id)}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: l.tilt }}
      transition={{ duration: 1, delay, ease: EASE }}
      whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.35, ease: EASE } }}
      className={cn('group absolute block text-left hover:z-30', l.box, l.z)}
    >
      <span
        className={cn(
          'relative block overflow-hidden rounded-md bg-surface shadow-[0_18px_50px_rgb(0_0_0/0.35)] ring-1 ring-rule',
          l.ratio,
        )}
      >
        <img src={p.cover} alt="" decoding="async" className="h-full w-full object-cover" />
        {/* Darkened edges pull the eye to the board in the middle. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.45))]"
        />
        <span
          className={cn(
            'absolute rounded bg-black/55 px-2 py-1 font-mono text-[11px] leading-none text-white backdrop-blur-sm',
            l.label,
          )}
        >
          {t(p.title)}
        </span>
      </span>
    </motion.button>
  )
}

export function Hero() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Bookend: as the page scrolls on, the text drifts up, fades and softens, so the next
  // section reads as the new focus.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(6px)'])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-40">
      {/* Graph paper behind the boards, fading out before it reaches the text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(var(--rule)/0.7)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--rule)/0.7)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_45%_60%_at_78%_45%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-page items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <motion.div style={reduce ? undefined : { y, opacity, filter: blur }} className="lg:col-span-7">
          <motion.button
            type="button"
            onClick={() => openProject('solibox')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group inline-flex items-center gap-2.5 rounded-md border border-rule bg-bg py-1.5 pl-2.5 pr-3 text-sm text-muted transition-colors hover:border-rule-strong hover:text-fg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {t(COPY.hero.award)}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="display mt-6 max-w-[16ch] text-[2.5rem] sm:text-[3.5rem] xl:text-[4.5rem]"
          >
            {t(COPY.hero.title)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            className="mt-4 max-w-lg text-lg text-muted"
          >
            {t(COPY.hero.sub)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn btn-primary">
              {t(COPY.hero.viewWork)}
            </a>
            <a href="#contact" className="btn btn-secondary bg-bg hover:bg-surface-2">
              {t(COPY.nav.contact)}
            </a>
          </motion.div>
        </motion.div>

        {/* Real boards from the projects; each opens its project. */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-xl lg:col-span-5 lg:max-w-none">
          {SHOTS.map((p, i) => (
            <Shot key={p.id} p={p} delay={0.3 + i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
