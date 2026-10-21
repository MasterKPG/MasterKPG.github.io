import { Reveal } from './Reveal'

/** Numbered section heading shared by every section, so the page reads as one index. */
export function SectionHeader({ index, label, sub }: { index: string; label: string; sub?: string }) {
  return (
    <Reveal>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        <span className="mr-3 text-accent sm:mr-4">{index}</span>
        {label}
      </h2>
      {sub && <p className="mt-4 max-w-2xl text-lg text-muted">{sub}</p>}
    </Reveal>
  )
}
