import { motion } from 'framer-motion'
import { COPY, CONTACT, SKILL_GROUPS } from '@/lib/content'
import { termKey, useLang } from '@/lib/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Calendar, GraduationCap, Languages, MapPin } from '@/components/ui/icons'
import { SPRING } from '@/components/ui/motion'

/** Children pop in one after another once the list scrolls into view. */
const list = { hidden: {}, show: { transition: { staggerChildren: 0.025 } } }
const pop = { hidden: { opacity: 0, scale: 0.7, y: 8 }, show: { opacity: 1, scale: 1, y: 0, transition: SPRING } }

export function About() {
  const { t } = useLang()

  const facts = [
    { label: COPY.about.studying, value: t(COPY.about.studyingValue), Icon: GraduationCap },
    { label: COPY.about.based, value: t(CONTACT.location), Icon: MapPin },
    { label: COPY.about.languages, value: t(CONTACT.languages), Icon: Languages },
    { label: COPY.about.graduation, value: CONTACT.graduation, Icon: Calendar },
  ]

  return (
    <Section id="about" title={t(COPY.about.title)}>
      {/* Four facts instead of a biography: each one is a label, an icon and a value. */}
      <motion.dl
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {facts.map((f) => (
          <motion.div
            key={f.label.en}
            variants={pop}
            className="panel group flex flex-col gap-6 p-5 transition-colors duration-300 hover:border-rule-strong"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-500 ease-spring group-hover:-rotate-12 group-hover:scale-110">
              <f.Icon className="h-5 w-5" />
            </span>
            <div>
              <dt className="meta text-muted">{t(f.label)}</dt>
              <dd className="mt-1 font-semibold leading-snug">{f.value}</dd>
            </div>
          </motion.div>
        ))}
      </motion.dl>

      <div id="skills" className="mt-16 scroll-mt-24">
        <Reveal>
          <h3 className="text-xl font-semibold tracking-tight">{t(COPY.about.toolkit)}</h3>
        </Reveal>
        <dl className="mt-6 space-y-7">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title.en} className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <dt className="meta pt-2 text-muted">{t(g.title)}</dt>
              <dd>
                <motion.ul
                  variants={list}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex flex-wrap gap-2"
                >
                  {g.items.map((item) => (
                    <motion.li
                      key={termKey(item)}
                      variants={pop}
                      className="rounded-full border border-rule bg-surface px-3.5 py-1.5 text-[15px] font-medium transition-[border-color,color,transform] duration-300 ease-spring hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {t(item)}
                    </motion.li>
                  ))}
                </motion.ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
