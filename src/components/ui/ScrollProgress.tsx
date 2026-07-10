import { motion, useScroll, useSpring } from 'framer-motion'

/** Aurora scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[1000] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-soft"
      aria-hidden
    />
  )
}
