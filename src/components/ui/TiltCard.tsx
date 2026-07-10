import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * 3D tilt card with cursor-tracked glare highlight.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 220,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 220,
    damping: 18,
  })
  const glareX = useTransform(px, [0, 1], ['20%', '80%'])
  const glareY = useTransform(py, [0, 1], ['20%', '80%'])

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      className={className}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 55%)`,
          ),
        }}
      />
    </motion.div>
  )
}
