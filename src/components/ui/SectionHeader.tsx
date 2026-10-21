import { Reveal } from './Reveal'

/** Numbered section heading shared by every section, so the page reads as one index. */
export function SectionHeader({
  index,
  label,
  title,
  sub,
}: {
  index: string
  label: string
  title: string
  sub?: string
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-[rgb(var(--line)/0.2)]" aria-hidden />
        <span className="text-muted">{label}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 max-w-2xl text-lg text-muted">{sub}</p>}
    </Reveal>
  )
}
