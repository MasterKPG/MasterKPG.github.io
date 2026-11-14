import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { COPY, CONTACT, HERO_SHOTS, PROJECTS, type Project } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { openProject } from '@/lib/project-link'
import { cn } from '@/lib/utils'
import { ArrowRight, GraduationCap, MapPin } from '@/components/ui/icons'
import { EASE, Magnetic, SPRING, Words } from '@/components/ui/motion'

const SHOTS = HERO_SHOTS.flatMap((id) => PROJECTS.filter((p) => p.id === id && p.cover))

/* Where each board sits in the collage. The main photo is the largest and in front of
   the one behind it; the third overlaps its corner. Small tilts keep it from reading as
   a grid, and nothing is tilted far enough to look random. */
const LAYOUT: Record<string, { box: string; tilt: number; z: string; ratio: string; label: string; float: string }> = {
  'saturating-accumulator': {
    box: 'right-0 top-[9%] w-[70%]',
    tilt: 0,
    z: 'z-10',
    ratio: 'aspect-square',
    label: 'right-3 top-3',
    float: 'animate-[float_7s_ease-in-out_infinite]',
  },
  'smart-garden': {
    box: 'left-0 top-0 w-[58%]',
    tilt: -2.5,
    z: 'z-0',
    ratio: 'aspect-video',
    label: 'bottom-3 left-3',
    float: 'animate-[float_9s_ease-in-out_-3s_infinite]',
  },
  'ping-pong': {
    box: 'bottom-0 left-[3%] w-[60%]',
    tilt: 1.5,
    z: 'z-20',
    ratio: 'aspect-video',
    label: 'bottom-3 left-3',
    float: 'animate-[float_8s_ease-in-out_-5s_infinite]',
  },
}

/**
 * One board photo. It floats a little, can be picked up and thrown (it springs back to
 * its place), and a plain click opens its project.
 */
function Shot({ p, delay }: { p: Project; delay: number }) {
  const { t } = useLang()
  const l = LAYOUT[p.id]
  const dragged = useRef(false)
  // Dragging is for a mouse or trackpad; on touch the photos must not block scrolling.
  const canDrag = useRef(typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches).current

  return (
    <motion.button
      type="button"
      drag={canDrag}
      dragSnapToOrigin
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 18 }}
      onDragStart={() => {
        dragged.current = true
      }}
      onClick={() => {
        // A drag ends in a click too; only a real click opens the project.
        if (dragged.current) dragged.current = false
        else openProject(p.id)
      }}
      initial={{ opacity: 0, y: 40, rotate: l.tilt * 4, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: l.tilt, scale: 1 }}
      transition={{ ...SPRING, stiffness: 140, damping: 16, delay }}
      whileHover={{ rotate: 0, scale: 1.03, transition: SPRING }}
      whileDrag={{ rotate: l.tilt * -2, scale: 1.06, zIndex: 40, cursor: 'grabbing' }}
      className={cn('group absolute block text-left hover:z-30', canDrag && 'cursor-grab', l.box, l.z)}
    >
      <span className={cn('block', l.float)}>
        <span
          className={cn(
            'relative block overflow-hidden rounded-card bg-surface shadow-[0_18px_50px_rgb(0_0_0/0.35)] ring-1 ring-rule',
            l.ratio,
          )}
        >
          <img src={p.cover} alt="" draggable={false} decoding="async" className="h-full w-full object-cover" />
          {/* Darkened edges pull the eye to the board in the middle. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.45))]"
          />
          <span
            className={cn(
              'absolute rounded-full bg-black/55 px-2.5 py-1.5 text-xs font-medium leading-none text-white backdrop-blur-sm',
              l.label,
            )}
          >
            {t(p.title)}
          </span>
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
  // The boards drift the other way, so the two halves pull apart.
  const boardsY = useTransform(scrollYProgress, [0, 1], [0, 50])

  const facts = [
    { Icon: GraduationCap, text: t(COPY.about.studyingValue) },
    { Icon: MapPin, text: t(CONTACT.location) },
  ]

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
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={SPRING}
            className="group inline-flex items-center gap-2.5 rounded-full border border-rule bg-bg py-1.5 pl-3 pr-3.5 text-sm text-muted transition-colors hover:border-rule-strong hover:text-fg"
          >
            <span className="h-1.5 w-1.5 animate-[blink_1.6s_ease-in-out_infinite] rounded-full bg-accent" aria-hidden />
            {t(COPY.hero.award)}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-spring group-hover:translate-x-1" />
          </motion.button>

          <p className="mt-7 text-xl font-medium text-accent sm:text-2xl">
            <Words text={t(COPY.hero.hello)} onMount delay={0.05} />
          </p>
          <h1 className="display mt-2 max-w-[16ch] text-[2.5rem] sm:text-[3.5rem] xl:text-[4.5rem]">
            <Words text={t(COPY.hero.title)} onMount delay={0.2} />
          </h1>

          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-muted"
          >
            {facts.map((f) => (
              <li key={f.text} className="inline-flex items-center gap-2">
                <f.Icon className="h-[18px] w-[18px]" />
                {f.text}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic>
              <a href="#projects" className="btn btn-primary">
                {t(COPY.hero.viewWork)}
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-secondary bg-bg hover:bg-surface-2">
                {t(COPY.nav.contact)}
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Real boards from the projects; each opens its project, and each can be dragged. */}
        <motion.div
          style={reduce ? undefined : { y: boardsY }}
          className="relative mx-auto aspect-[5/4] w-full max-w-xl lg:col-span-5 lg:max-w-none"
        >
          {SHOTS.map((p, i) => (
            <Shot key={p.id} p={p} delay={0.35 + i * 0.14} />
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="meta pointer-events-none absolute -bottom-9 right-0 hidden text-muted lg:block"
          >
            {t(COPY.hero.drag)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
