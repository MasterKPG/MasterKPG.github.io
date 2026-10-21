import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/lib/theme'
import { LangProvider } from '@/lib/i18n'
import { CvPage } from './CvPage'
import '../index.css'
import './latex.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <CvPage />
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
)
