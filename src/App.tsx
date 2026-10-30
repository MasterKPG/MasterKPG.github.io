import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/lib/theme'
import { LangProvider } from '@/lib/i18n'
import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Tools } from '@/components/sections/Tools'
import { Projects } from '@/components/sections/Projects'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Activity } from '@/components/sections/Activity'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <MotionConfig reducedMotion="user">
          <Nav />
          <main id="main" className="relative">
            {/* The page frame: two hairlines at the content edges on wide screens, so the
                sections sit inside one drawing. Section rules end in marks on these lines. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-page -translate-x-1/2 border-x border-rule xl:block"
            />
            <Hero />
            <Tools />
            <Projects />
            <About />
            <Experience />
            <Activity />
            <Contact />
          </main>
          <Footer />
        </MotionConfig>
      </LangProvider>
    </ThemeProvider>
  )
}
