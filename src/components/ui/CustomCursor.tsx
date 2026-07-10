import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a crisp dot plus a trailing ring that expands over
 * interactive elements. Fine pointers only; disabled for reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return

    document.body.classList.add('custom-cursor')

    const dot = dotRef.current!
    const ring = ringRef.current!
    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let hovering = false
    let raf = 0

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      const target = e.target as HTMLElement
      hovering = !!target.closest('a, button, [role="button"], input, textarea, [data-cursor]')
    }

    const render = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      const scale = hovering ? 2.4 : 1
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`
      ring.style.opacity = hovering ? '0.9' : '0.5'
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference md:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-8 w-8 rounded-full border border-accent/70 transition-opacity duration-300 md:block"
      />
    </>
  )
}
