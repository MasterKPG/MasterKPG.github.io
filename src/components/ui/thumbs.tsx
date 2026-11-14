import type { ComponentType } from 'react'
import type { Project } from '@/lib/content'
import { cn } from '@/lib/utils'
import { CoverImage } from './SmartMedia'
import { Sheet, SoliboxDiagram } from './diagrams'

/* A thumbnail for every project. Projects with a photo show the photo; the others get a
   small blueprint drawing of what the thing is. Each drawing has one move that plays
   while its tile is hovered or focused (the `live:` variant): the gate opens, the carry
   ripples through the adder, the car drives under the barrier. All drawings share one
   320 by 200 sheet and the same three strokes. */

const A = 'rgb(var(--accent))'
const M = 'rgb(var(--muted))'
const R = 'rgb(var(--rule-strong))'
const BG = 'rgb(var(--bg))'
const TINT = 'rgb(var(--accent) / 0.14)'

const ln = { fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Moves in the drawing's own coordinates, with a small overshoot. */
const MOVE = '[transform-box:view-box] transition-transform duration-500 ease-spring'
const GLIDE = '[transform-box:view-box] transition-transform duration-700 ease-soft'

/** 13 taps and one multiply-accumulate unit that visits each of them. */
function Fir() {
  const taps = [-6, -10, 0, 18, 40, 62, 72, 62, 40, 18, 0, -10, -6]
  return (
    <>
      <path d="M36 136H284" stroke={R} {...ln} />
      {taps.map((h, i) => (
        <g key={i}>
          <path d={`M${52 + i * 18} 136V${136 - h}`} stroke={M} {...ln} />
          <circle cx={52 + i * 18} cy={136 - h} r="3" fill={BG} stroke={A} strokeWidth="1.5" />
        </g>
      ))}
      <rect
        x="43"
        y="50"
        width="18"
        height="104"
        rx="6"
        fill={TINT}
        stroke={A}
        strokeWidth="1.5"
        className="live:animate-[scan_2.6s_ease-in-out_infinite]"
      />
    </>
  )
}

/** The board: USB, power, the ATmega in the middle, two headers and an LED. */
function Board() {
  return (
    <>
      <rect x="56" y="36" width="208" height="128" rx="10" fill={BG} stroke={R} strokeWidth="1.5" />
      <rect x="44" y="56" width="34" height="30" rx="3" fill={BG} stroke={M} strokeWidth="1.5" />
      <rect x="44" y="118" width="28" height="26" rx="3" fill={BG} stroke={M} strokeWidth="1.5" />
      <rect x="130" y="46" width="116" height="10" rx="2" stroke={M} {...ln} />
      <rect x="150" y="144" width="96" height="10" rx="2" stroke={M} {...ln} />
      <rect x="96" y="100" width="18" height="10" rx="5" stroke={M} {...ln} />
      <circle cx="100" cy="62" r="6" stroke={M} {...ln} />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${135 + i * 10} 88v6M${135 + i * 10} 120v6`} stroke={A} {...ln} />
      ))}
      <rect x="128" y="94" width="104" height="26" rx="3" fill={TINT} stroke={A} strokeWidth="1.5" />
      <circle cx="246" cy="78" r="4" fill={A} className="opacity-30 live:animate-[blink_0.7s_ease-in-out_infinite]" />
    </>
  )
}

/** Two leaves on their posts. They swing open, and the warning light blinks. */
function Gate() {
  const bars = [0, 1, 2, 3]
  return (
    <>
      <path d="M40 156H280" stroke={R} {...ln} />
      <g className={cn(GLIDE, 'origin-[70px_104px] live:scale-x-[0.28]')}>
        <rect x="70" y="64" width="88" height="84" rx="2" stroke={A} {...ln} />
        {bars.map((i) => (
          <path key={i} d={`M${88 + i * 18} 64V148`} stroke={A} strokeOpacity="0.55" {...ln} />
        ))}
      </g>
      <g className={cn(GLIDE, 'origin-[250px_104px] live:scale-x-[0.28]')}>
        <rect x="162" y="64" width="88" height="84" rx="2" stroke={A} {...ln} />
        {bars.map((i) => (
          <path key={i} d={`M${178 + i * 18} 64V148`} stroke={A} strokeOpacity="0.55" {...ln} />
        ))}
      </g>
      <rect x="58" y="52" width="12" height="104" rx="2" fill={BG} stroke={M} strokeWidth="1.5" />
      <rect x="250" y="52" width="12" height="104" rx="2" fill={BG} stroke={M} strokeWidth="1.5" />
      <circle cx="64" cy="42" r="5" fill={A} className="opacity-30 live:animate-[blink_0.5s_ease-in-out_infinite]" />
    </>
  )
}

function Bit({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <>
      <rect x={x} y={y} width="30" height="30" rx="8" fill={on ? A : BG} stroke={on ? A : R} strokeWidth="1.5" />
      <text
        x={x + 15}
        y={y + 20.5}
        textAnchor="middle"
        fontSize="15"
        fontWeight="600"
        fontFamily="Figtree, sans-serif"
        fill={on ? 'rgb(var(--on-accent))' : M}
      >
        {on ? 1 : 0}
      </text>
    </>
  )
}

/** 011 + 001 = 100. The sum lights up from the right, as the carry ripples. */
function Adder() {
  const xs = [118, 160, 202]
  const rows: [number, boolean[]][] = [
    [34, [false, true, true]],
    [72, [false, false, true]],
  ]
  const sum = [true, false, false]
  return (
    <>
      {rows.map(([y, bits]) => bits.map((on, i) => <Bit key={`${y}-${i}`} x={xs[i]} y={y} on={on} />))}
      <path d="M84 82h12M90 76v12" stroke={M} {...ln} />
      <path d="M80 116H246" stroke={R} {...ln} />
      {sum.map((on, i) => (
        <g
          key={i}
          className="opacity-30 transition-opacity duration-300 live:opacity-100"
          style={{ transitionDelay: `${(2 - i) * 160}ms` }}
        >
          <Bit x={xs[i]} y={130} on={on} />
        </g>
      ))}
    </>
  )
}

/** A feed of posts, and a lens that reads down it. */
function Feed() {
  return (
    <>
      {[34, 81, 128].map((y) => (
        <g key={y}>
          <rect x="84" y={y} width="152" height="38" rx="8" fill={BG} stroke={R} strokeWidth="1.5" />
          <circle cx="104" cy={y + 19} r="8" stroke={M} {...ln} />
          <path d={`M120 ${y + 14}H200`} stroke={M} {...ln} />
          <path d={`M120 ${y + 25}H176`} stroke={R} {...ln} />
        </g>
      ))}
      <g className={cn(GLIDE, 'live:translate-y-[94px]')}>
        <circle cx="214" cy="50" r="20" fill={TINT} stroke={A} strokeWidth="2" />
        <path d="M228 64l16 16" stroke={A} fill="none" strokeWidth="3" strokeLinecap="round" />
      </g>
    </>
  )
}

/** A car park: the barrier lifts and the car drives in. */
function Parking() {
  return (
    <>
      <path d="M70 92V36H250V92M115 36V92M160 36V92M205 36V92" stroke={R} {...ln} />
      <rect x="76" y="46" width="33" height="40" rx="7" stroke={M} {...ln} />
      <rect x="166" y="46" width="33" height="40" rx="7" stroke={M} {...ln} />
      <path d="M40 164H280" stroke={R} strokeDasharray="6 8" {...ln} />
      <g className={cn(GLIDE, 'delay-150 live:translate-x-[176px]')}>
        <rect x="46" y="126" width="46" height="24" rx="8" fill={TINT} stroke={A} strokeWidth="1.5" />
        <path d="M76 132v12" stroke={A} {...ln} />
      </g>
      <rect x="258" y="112" width="6" height="44" rx="2" fill={BG} stroke={M} strokeWidth="1.5" />
      <path
        d="M261 116H196"
        stroke={A}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className={cn(MOVE, 'origin-[261px_116px] live:rotate-[62deg]')}
      />
    </>
  )
}

/** A marketplace for crops, on a phone and in a browser. The sprout grows. */
function Market() {
  return (
    <>
      <rect x="52" y="56" width="46" height="84" rx="9" stroke={M} {...ln} />
      <path d="M68 66h14" stroke={M} {...ln} />
      <rect x="216" y="62" width="62" height="50" rx="7" stroke={M} {...ln} />
      <path d="M216 76h62" stroke={M} {...ln} />
      <path d="M118 152H202" stroke={R} {...ln} />
      <g className={cn(MOVE, 'origin-[160px_152px] scale-[0.82] live:scale-110')}>
        <path d="M160 152V84" stroke={A} {...ln} />
        <path d="M160 116c-20-2-32-16-34-32 20 2 32 14 34 32z" fill={TINT} stroke={A} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M160 98c20-2 32-16 34-32-20 2-32 14-34 32z" fill={TINT} stroke={A} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </>
  )
}

/** One shape, one cut, two halves. */
function Halves() {
  return (
    <>
      <path
        d="M160 50a50 50 0 0 0 0 100z"
        fill={TINT}
        stroke={A}
        strokeWidth="1.5"
        strokeLinejoin="round"
        className={cn(MOVE, 'origin-[160px_150px] live:-translate-x-3 live:-rotate-6')}
      />
      <path
        d="M160 50a50 50 0 0 1 0 100z"
        stroke={M}
        {...ln}
        className={cn(MOVE, 'origin-[160px_150px] live:translate-x-3 live:rotate-6')}
      />
      <path d="M160 30V170" stroke={R} strokeDasharray="5 7" {...ln} />
    </>
  )
}

/** A sailboat that heels and moves off while the swell runs under it. */
function Sailboat() {
  const swell = 'M-40 152' + ' q5 -7 10 0 t10 0'.repeat(20)
  return (
    <>
      <g className={cn(GLIDE, 'origin-[160px_146px] live:translate-x-4 live:-rotate-6')}>
        <path d="M158 132V54" stroke={A} {...ln} />
        <path d="M163 60l38 64h-38z" fill={TINT} stroke={A} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M153 72l-28 52h28z" stroke={M} {...ln} />
        <path d="M112 132h96l-12 14h-72z" fill={BG} stroke={A} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <path d={swell} stroke={R} {...ln} className="live:animate-[drift_1.4s_linear_infinite]" />
      <path d={swell} stroke={R} strokeOpacity="0.6" {...ln} transform="translate(10 14)" />
    </>
  )
}

/** Points, their centroids, and the three clusters K-Means finds. */
function Clusters() {
  const groups = [
    { cx: 86, cy: 68, pts: [[-22, -10], [-8, 14], [12, -16], [18, 8], [-14, -26], [4, 22], [26, -4]] },
    { cx: 236, cy: 62, pts: [[-18, 10], [10, -14], [20, 12], [-6, -20], [-24, -6], [6, 18]] },
    { cx: 160, cy: 136, pts: [[-20, -8], [14, -12], [22, 10], [-10, 16], [0, -22], [-26, 8], [8, 4]] },
  ]
  return (
    <>
      {groups.map((g, i) => (
        <g key={i}>
          {g.pts.map(([dx, dy], j) => (
            <circle key={j} cx={g.cx + dx} cy={g.cy + dy} r="3.5" fill={M} fillOpacity="0.8" />
          ))}
          <path d={`M${g.cx - 6} ${g.cy}h12M${g.cx} ${g.cy - 6}v12`} stroke={A} {...ln} />
          <circle
            cx={g.cx}
            cy={g.cy}
            r="36"
            fill={TINT}
            stroke={A}
            strokeWidth="1.5"
            strokeDasharray="3 5"
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-spring [transform-box:fill-box] live:scale-100 live:opacity-100"
            style={{ transitionDelay: `${i * 90}ms` }}
          />
        </g>
      ))}
    </>
  )
}

/** Sun and cloud: the rays turn and the cloud drifts across. */
function Weather() {
  return (
    <>
      <g className={cn(GLIDE, 'origin-[124px_84px] live:rotate-45')}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4
          const p = (r: number) => `${(124 + r * Math.cos(a)).toFixed(1)} ${(84 + r * Math.sin(a)).toFixed(1)}`
          return <path key={i} d={`M${p(31)}L${p(41)}`} stroke={A} {...ln} />
        })}
      </g>
      <circle cx="124" cy="84" r="22" fill={TINT} stroke={A} strokeWidth="1.5" />
      <path
        d="M156 148h70a22 22 0 0 0 2-44 30 30 0 0 0-56-8 26 26 0 0 0-16 52z"
        fill={BG}
        stroke={M}
        strokeWidth="1.5"
        strokeLinejoin="round"
        className={cn(GLIDE, 'live:translate-x-5')}
      />
    </>
  )
}

/** A DLL sliding into the free slot of another process. */
function Inject() {
  return (
    <>
      <rect x="168" y="38" width="104" height="124" rx="10" fill={BG} stroke={R} strokeWidth="1.5" />
      <path d="M180 54h36" stroke={M} {...ln} />
      <rect x="180" y="68" width="80" height="20" rx="5" stroke={M} {...ln} />
      <rect x="180" y="96" width="80" height="20" rx="5" stroke={M} {...ln} />
      <rect x="180" y="126" width="80" height="22" rx="5" stroke={A} strokeDasharray="4 5" {...ln} />
      <path d="M136 137h20m-6-6 6 6-6 6" stroke={M} {...ln} className="transition-opacity duration-200 live:opacity-0" />
      <g className={cn(GLIDE, 'live:translate-x-[132px]')}>
        <rect x="48" y="126" width="80" height="22" rx="5" fill={TINT} stroke={A} strokeWidth="1.5" />
        <text x="88" y="141.5" textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="Figtree, sans-serif" fill={A}>
          DLL
        </text>
      </g>
    </>
  )
}

/** A picture on the left, the same picture in characters on the right. */
function Ascii() {
  const rows = ['.:-=+*#@', ':-=+*#@@', '-=+*#%@@', '=+*#%@@@', '+*#%@@@@']
  return (
    <>
      <rect x="40" y="60" width="84" height="80" rx="8" stroke={M} {...ln} />
      <circle cx="102" cy="82" r="7" fill={TINT} stroke={A} strokeWidth="1.5" />
      <path d="M48 132l26-32 18 20 12-12 14 24" stroke={M} {...ln} />
      <path d="M138 100h22m-6-6 6 6-6 6" stroke={R} {...ln} />
      {rows.map((row, i) => (
        <text
          key={i}
          x="176"
          y={74 + i * 16}
          fontSize="13"
          fontFamily="ui-monospace, Menlo, Consolas, monospace"
          letterSpacing="2"
          fill={A}
          className="opacity-30 transition-opacity duration-300 live:opacity-100"
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          {row}
        </text>
      ))}
    </>
  )
}

const ART: Record<string, ComponentType> = {
  'fir-filter': Fir,
  'arduino-clone': Board,
  'gate-controller': Gate,
  adder: Adder,
  xscraper: Feed,
  'parking-sim': Parking,
  agrimarket: Market,
  'half-half': Halves,
  'tipe-sailboat': Sailboat,
  'ml-clustering': Clusters,
  'weather-api': Weather,
  'dll-injection': Inject,
  'ascii-art': Ascii,
}

/** The picture for a project: its photo, the Solibox diagram, or its drawing. */
export function Thumb({ p, alt = '', className }: { p: Project; alt?: string; className?: string }) {
  if (p.id === 'solibox') {
    return (
      <div className={cn('h-full w-full', className)}>
        <SoliboxDiagram />
      </div>
    )
  }
  if (p.cover) {
    return (
      <CoverImage
        src={p.cover}
        alt={alt}
        className={cn('h-full w-full', className)}
        imgClassName="transition-transform duration-700 ease-soft live:scale-[1.06]"
      />
    )
  }
  const Art = ART[p.id]
  return (
    <Sheet className={className}>
      {Art && (
        <svg viewBox="0 0 320 200" className="h-full w-full" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
          <Art />
        </svg>
      )}
    </Sheet>
  )
}
