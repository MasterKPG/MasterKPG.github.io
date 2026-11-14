import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n'
import { EASE } from './motion'

/* Blueprint drawings for the projects that have no photo. They show what the thing is
   (how Solibox is wired, how the parking processes talk, what K-Means does) rather than
   decorate. Lines are in the accent and draw themselves in, the site's "draw" motion. */

const GRID =
  '[background-image:linear-gradient(rgb(var(--rule)/0.8)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--rule)/0.8)_1px,transparent_1px)] [background-size:24px_24px]'

/** Graph-paper frame the drawings sit on. */
export function Sheet({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`relative h-full w-full bg-surface ${GRID} ${className}`}>{children}</div>
}

function Line({ d, delay = 0, dashed }: { d: string; delay?: number; dashed?: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgb(var(--accent))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Framer draws a path by animating its dash pattern, so a dashed line fades in instead.
      strokeDasharray={dashed ? '4 5' : undefined}
      initial={dashed ? { opacity: 0 } : { pathLength: 0 }}
      whileInView={dashed ? { opacity: 1 } : { pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    />
  )
}

function Box({ x, y, w, h, label, sub }: { x: number; y: number; w: number; h: number; label: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="rgb(var(--bg))" stroke="rgb(var(--rule-strong))" />
      <text
        x={x + 14}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 5}
        fill="rgb(var(--fg))"
        fontSize="14"
        fontFamily="Figtree, sans-serif"
        fontWeight="500"
      >
        {label}
      </text>
      {sub && (
        <text x={x + 14} y={y + h / 2 + 14} fill="rgb(var(--muted))" fontSize="11" fontFamily="Figtree, sans-serif">
          {sub}
        </text>
      )}
    </g>
  )
}

function Via({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r="3.5" fill="rgb(var(--bg))" stroke="rgb(var(--accent))" strokeWidth="1.5" />
}

/** Solibox: a Raspberry Pi broadcasting its own WiFi to a captive portal and its content. */
export function SoliboxDiagram() {
  const { t } = useLang()
  const items = [
    { en: 'PDFs', fr: 'PDF' },
    { en: 'Quizzes', fr: 'Quiz' },
    { en: 'Offline Wikipedia', fr: 'Wikipédia hors ligne' },
    { en: 'Videos', fr: 'Vidéos' },
  ]
  const ys = [56, 128, 200, 272]
  return (
    <Sheet>
      <svg
        viewBox="0 0 640 400"
        className="h-full w-full"
        role="img"
        aria-label={t({
          en: 'Diagram: a Raspberry Pi broadcasts its own WiFi to a captive portal that serves PDFs, quizzes, an offline Wikipedia and videos, with no internet.',
          fr: "Schéma : un Raspberry Pi diffuse son propre WiFi vers un portail captif qui sert des PDF, des quiz, un Wikipédia hors ligne et des vidéos, sans internet.",
        })}
      >
        {/* Pi to portal, over the air */}
        <Line d="M178 200 H262" />
        {[0, 1, 2].map((i) => (
          <Line key={i} d={`M${206 + i * 9} ${186 - i * 7} q8 14 0 28`} delay={0.2 + i * 0.1} />
        ))}
        {/* Portal to each kind of content, routed like traces */}
        {ys.map((y, i) => (
          <Line key={y} d={`M402 200 H430 V${y + 22} H462`} delay={0.5 + i * 0.1} />
        ))}
        <Via cx={430} cy={200} />
        {ys.map((y) => (
          <Via key={y} cx={430} cy={y + 22} />
        ))}

        <Box x={40} y={160} w={138} h={80} label="Raspberry Pi" sub="Linux · systemd" />
        <text x={190} y={168} fill="rgb(var(--muted))" fontSize="11" fontFamily="Figtree, sans-serif">
          {t({ en: 'own WiFi', fr: 'WiFi dédié' })}
        </text>
        <Box x={262} y={160} w={140} h={80} label={t({ en: 'Captive portal', fr: 'Portail captif' })} sub="Flask · NGINX" />
        {items.map((it, i) => (
          <Box key={it.en} x={462} y={ys[i]} w={146} h={44} label={t(it)} />
        ))}

        {/* No internet: a crossed-out cloud */}
        <g transform="translate(52 300)" stroke="rgb(var(--muted))" fill="none" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 30h34a10 10 0 0 0 0-20 14 14 0 0 0-27-3A11 11 0 0 0 10 30z" />
          <path d="M6 4l44 32" />
        </g>
        <text x={116} y={327} fill="rgb(var(--muted))" fontSize="12" fontFamily="Figtree, sans-serif">
          {t({ en: 'no internet needed', fr: 'sans internet' })}
        </text>
      </svg>
    </Sheet>
  )
}
