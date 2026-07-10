import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { COPY, MORPH_WORDS } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { LiquidButton } from '@/components/ui/LiquidButton'
import { Magnetic } from '@/components/ui/Magnetic'

// Code-split three.js into its own chunk — keeps initial JS light
const ShaderAnimation = lazy(() =>
  import('@/components/ui/ShaderAnimation').then((m) => ({ default: m.ShaderAnimation })),
)

export function Hero() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Rotating role word — restrained kinetic typography (fade + slide)
  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setWordIndex((i) => (i + 1) % MORPH_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  // Mouse-follow spotlight (accent, low emission)
  useEffect(() => {
    const el = ref.current
    const spot = spotRef.current
    if (!el || !spot) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      spot.style.background = `radial-gradient(520px circle at ${e.clientX - r.left}px ${
        e.clientY - r.top
      }px, rgba(34,197,94,0.10), transparent 60%)`
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-950"
    >
      {/* three.js line-burst shader (lazy-loaded chunk) — z-0 sits above the section bg */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ShaderAnimation className="h-full w-full" />
        </Suspense>
      </div>
      {/* scrims for text contrast (AAA) + spotlight — light enough to keep the burst visible */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 62% 55% at center, rgba(8,9,12,0.5) 0%, rgba(8,9,12,0.2) 45%, transparent 82%)',
        }}
      />
      <div ref={spotRef} className="pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-ink-950 to-transparent" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-wide text-white/70 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t(COPY.hero.kicker)}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl font-extrabold leading-[0.95] tracking-[-0.03em] text-white sm:text-8xl"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.6)' }}
        >
          Mohammad
          <br />
          <span className="font-serif text-[0.92em] font-normal italic text-accent">Amara</span>
        </motion.h1>

        {/* Rotating role word */}
        <div className="mt-5 flex h-9 items-center justify-center overflow-hidden sm:h-11">
          <span className="font-mono text-sm text-white/45 sm:text-base">&lt;</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mx-2 font-mono text-lg font-semibold tracking-tight text-accent sm:text-2xl"
            >
              {MORPH_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="font-mono text-sm text-white/45 sm:text-base">/&gt;</span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg"
          style={{ textShadow: '0 1px 20px rgba(0,0,0,0.8)' }}
        >
          {t(COPY.hero.tagline)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <LiquidButton onClick={() => scrollTo('projects')}>{t(COPY.hero.viewWork)}</LiquidButton>
          </Magnetic>
          <Magnetic>
            <LiquidButton variant="glass" onClick={() => scrollTo('contact')}>
              {t(COPY.hero.getInTouch)}
            </LiquidButton>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-0.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
