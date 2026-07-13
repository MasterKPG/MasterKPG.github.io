import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'fr'

/** Bilingual string: every piece of copy carries both languages. */
export interface Bi {
  en: string
  fr: string
}

const LangContext = createContext<{ lang: Lang; toggle: () => void; t: (bi: Bi) => string }>({
  lang: 'en',
  toggle: () => {},
  t: (bi) => bi.en,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'fr') return saved
    } catch {
      /* ignore */
    }
    return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
  })

  const toggle = useCallback(() => {
    setLang((l) => {
      const next = l === 'en' ? 'fr' : 'en'
      try {
        localStorage.setItem('lang', next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const t = useCallback((bi: Bi) => bi[lang], [lang])

  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
