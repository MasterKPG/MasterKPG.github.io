import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/lib/theme'
import { LangProvider } from '@/lib/i18n'
import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
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
          <main id="main">
            <Hero />
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
