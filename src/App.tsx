import { ThemeProvider } from '@/lib/theme'
import { LangProvider } from '@/lib/i18n'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { GlassFilter } from '@/components/ui/liquid-glass-button'
import { LiquidGlassFilter } from '@/components/ui/liquid-glass'
import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <GlassFilter />
        <LiquidGlassFilter />
        <ScrollProgress />
        <Nav />
        <main className="relative overflow-hidden">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </LangProvider>
    </ThemeProvider>
  )
}
