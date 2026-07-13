/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Graphite dark system, single electric cyan accent.
        // ink-950 must track --bg in index.css: the hero fades into it.
        ink: {
          950: '#181a1e',
          900: '#1e2126',
          800: '#22252a',
          700: '#2e323a',
          600: '#3c4149',
        },
        porcelain: {
          50: '#f6f9fa',
          100: '#ecf1f4',
          200: '#dce4ea',
        },
        accent: {
          DEFAULT: '#22d3ee',
          soft: '#67e8f9',
          dim: '#0891b2',
        },
        // shadcn-style tokens consumed by liquid-glass-button.tsx
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: '#ffffff',
        },
        ring: 'rgb(var(--ring) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        'marquee-reverse': 'marquee 50s linear infinite reverse',
        'spin-slow': 'spin 12s linear infinite',
        float: 'float 9s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
