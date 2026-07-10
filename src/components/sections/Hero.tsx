import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { COPY, MORPH_WORDS } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { ShaderBackground } from '@/components/ui/ShaderBackground'
import { GooeyText } from '@/components/ui/GooeyText'
import { LiquidButton } from '@/components/ui/LiquidButton'
import { Magnetic } from '@/components/ui/Magnetic'

export function Hero() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Mouse-follow spotlight
  useEffect(() => {
    const el = ref.current
    const spot = spotRef.current
    if (!el || !spot) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      spot.style.background = `radial-gradient(600px circle at ${e.clientX - r.left}px ${
        e.clientY - r.top
      }px, rgba(139,92,246,0.14), transparent 60%)`
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ShaderBackground />
      </div>
      <div ref={spotRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden />
      {/* fade shader into page bg at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[rgb(var(--bg))] to-transparent" />

      <motion.div style={{ y, opacity }} className="mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs tracking-wide text-muted"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {t(COPY.hero.kicker)}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Mohammad <span className="text-gradient">Amara</span>
        </motion.h1>

        {/* Gooey morphing tech showcase */}
        <div className="mt-4 flex h-20 items-center justify-center sm:h-24">
          <GooeyText
            texts={MORPH_WORDS}
            morphTime={1}
            cooldownTime={1.4}
            textClassName="font-display text-4xl sm:text-6xl font-bold text-gradient"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg"
        >
          {t(COPY.hero.tagline)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
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

      {/* scroll hint */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-current/25 p-1">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-0.5 rounded-full bg-aurora-cyan"
          />
        </div>
      </motion.div>
    </section>
  )
}
