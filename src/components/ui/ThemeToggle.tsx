import { useTheme } from '@/lib/theme'
import { useLang } from '@/lib/i18n'

/** Switches between the dark and light themes; the icon shows the theme you would get. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { lang } = useLang()
  const isDark = theme === 'dark'
  const label = isDark
    ? lang === 'fr' ? 'Passer au thème clair' : 'Switch to light theme'
    : lang === 'fr' ? 'Passer au thème sombre' : 'Switch to dark theme'

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  )
}
