/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // OLED dark system — deep ink surfaces, single green accent
        ink: {
          950: '#08090c',
          900: '#0c0e13',
          800: '#12151d',
          700: '#1a1e28',
          600: '#252b38',
        },
        porcelain: {
          50: '#f7f8fa',
          100: '#eef0f4',
          200: '#dfe3ea',
        },
        accent: {
          DEFAULT: '#22c55e',
          soft: '#4ade80',
          dim: '#16a34a',
        },
      },
      fontFamily: {
        // Syne = artistic display; Space Grotesk = characterful body;
        // Instrument Serif = elegant italic accent; JetBrains Mono = code labels
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
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
