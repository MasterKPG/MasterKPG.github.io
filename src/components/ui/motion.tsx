import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* The site's two motion themes, used everywhere so they read as one identity:
   - draw: hairlines draw in from the left, like a line on a technical drawing;
   - develop: images open from a smaller frame and settle, like a print developing.
   Both run once, when the element first scrolls into view. MotionConfig at each app root
   turns the movement off for people who ask for reduced motion. */

export const EASE = [0.22, 1, 0.36, 1] as const

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
  rounded = '6px',
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
