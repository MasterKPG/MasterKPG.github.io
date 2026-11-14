import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

/* The site's motion themes, repeated everywhere so they read as one identity:
   - draw: hairlines draw in from the left, like a line on a technical drawing;
   - develop: images open from a smaller frame and settle, like a print developing;
   - words: headings arrive one word at a time, out of a soft blur;
   - pull: the main actions lean towards the pointer, like a magnet under the board.
   All run once, when the element first scrolls into view. MotionConfig at each app root
   turns the movement off for people who ask for reduced motion. */

export const EASE = [0.24, 1, 0.4, 1] as const

/** A light spring with a little overshoot, for things that pop or get picked up. */
export const SPRING = { type: 'spring', stiffness: 420, damping: 26 } as const

/** A hairline that draws itself in from the left. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={cn('h-px origin-left bg-rule', className)}
    />
  )
}

/** A frame whose image opens from an inset and settles in scale. */
export function Develop({
  children,
  className,
  delay = 0,
  rounded = '16px',
}: {
  children: ReactNode
  className?: string
  delay?: number
  rounded?: string
}) {
  return (
    <motion.div
      initial={{ clipPath: `inset(10% 10% 10% 10% round ${rounded})`, opacity: 0.4 }}
      whileInView={{ clipPath: `inset(0% 0% 0% 0% round ${rounded})`, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={cn('overflow-hidden', className)}
      style={{ borderRadius: rounded }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/**
 * Text that arrives word by word, each rising out of a blur. Screen readers get the
 * plain sentence. The key on the text replays it when the language changes.
 */
export function Words({ text, delay = 0, onMount }: { text: string; delay?: number; onMount?: boolean }) {
  const show = { opacity: 1, y: 0, filter: 'blur(0px)' }
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden key={text}>
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, y: '0.45em', filter: 'blur(8px)' }}
            animate={onMount ? show : undefined}
            whileInView={onMount ? undefined : show}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: delay + i * 0.055, ease: EASE }}
          >
            {word + ' '}
          </motion.span>
        ))}
      </span>
    </>
  )
}

/** Leans its child towards the pointer while it is over it, and springs back after. */
export function Magnetic({ children, pull = 0.3 }: { children: ReactNode; pull?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 16, mass: 0.4 })
  const y = useSpring(my, { stiffness: 260, damping: 16, mass: 0.4 })

  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * pull)
    my.set((e.clientY - (r.top + r.height / 2)) * pull)
  }
  const leave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.span ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className="inline-flex">
      {children}
    </motion.span>
  )
}
