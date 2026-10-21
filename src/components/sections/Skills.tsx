import { COPY, SKILL_GROUPS } from '@/lib/content'
import type { SkillItem } from '@/lib/content'
import { useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Skills() {
  const { t } = useLang()
  const label = (item: SkillItem) => (typeof item === 'string' ? item : t(item))

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="02" label={t(COPY.skills.label)} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal key={g.title.en} delay={(i % 2) * 0.06}>
            <div className="card h-full p-6">
              <h3 className="border-b border-line pb-3 font-display text-lg font-semibold">{t(g.title)}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={label(item)}
                    className="rounded-md border border-line px-2.5 py-1 text-sm text-[rgb(var(--fg)/0.85)]"
                  >
                    {label(item)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
