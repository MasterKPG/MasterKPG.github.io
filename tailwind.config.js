import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './cv/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Every colour is a token from src/index.css, so both themes come for free.
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        'rule-strong': 'rgb(var(--rule-strong) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
      },
      // One sans family for everything. Numbers line up through tabular figures (.meta).
      fontFamily: {
        display: ['Figtree', 'system-ui', 'sans-serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
      },
      // Soft corners: 12px for controls, 16px for cards and pictures.
      borderRadius: {
        md: '12px',
        card: '16px',
      },
      maxWidth: {
        page: '76rem',
      },
      transitionTimingFunction: {
        // Settles without overshoot: entrances and moves.
        soft: 'cubic-bezier(0.24, 1, 0.4, 1)',
        // A small overshoot, for the playful bits (the drawings, the tiles).
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        ribbon: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        blink: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        drift: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-40px)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(216px)' },
        },
      },
    },
  },
  plugins: [
    // `live:` styles a drawing while its tile is hovered or focused, or inside `.is-live`.
    plugin(({ addVariant }) => {
      addVariant('live', ['.group:hover &', '.group:focus-visible &', '.is-live &'])
    }),
  ],
}
