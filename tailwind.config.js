/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Futuristic palette — void dark + porcelain light, aurora accents
        void: {
          950: '#030308',
          900: '#06060f',
          800: '#0b0b1a',
          700: '#131327',
        },
        porcelain: {
          50: '#f6f7fb',
          100: '#eceef6',
          200: '#dde1ee',
        },
        aurora: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          magenta: '#d946ef',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 48s linear infinite reverse',
        aurora: 'aurora 14s ease-in-out infinite',
        'spin-slow': 'spin 9s linear infinite',
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)', opacity: '0.6' },
          '33%': { transform: 'translate(40px,-30px) scale(1.15)', opacity: '0.8' },
          '66%': { transform: 'translate(-30px,20px) scale(0.95)', opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
}
