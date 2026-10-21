import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'fr'

/** Bilingual string: every piece of copy carries both languages. */
export interface Bi {
  en: string
  fr: string
}

/** A label that is either the same in both languages (a technical term) or translated. */
export type Term = string | Bi

/** Stable key for a term, whatever the language. */
export const termKey = (x: Term) => (typeof x === 'string' ? x : x.en)

const LangContext = createContext<{ lang: Lang; toggle: () => void; t: (bi: Term) => string }>({
  lang: 'en',
  toggle: () => {},
  t: (bi) => (typeof bi === 'string' ? bi : bi.en),
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

  // Keep <html lang> in step so screen readers and hyphenation follow the toggle.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback((bi: Term) => (typeof bi === 'string' ? bi : bi[lang]), [lang])

  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
