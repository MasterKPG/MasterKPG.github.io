/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // OLED dark system — cool ink surfaces, single electric-cyan accent
        // (palette per ui-ux-pro-max ui-styling: electric cyan for tech)
        ink: {
          950: '#05090c',
          900: '#0a0f14',
          800: '#10161d',
          700: '#171f29',
          600: '#22303c',
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
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
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
