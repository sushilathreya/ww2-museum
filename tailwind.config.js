/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        military: {
          green: {
            DEFAULT: '#4a5d23',
            light: '#6b7f3a',
            dark: '#2d3a14',
          },
          gold: {
            DEFAULT: '#c9a227',
            light: '#dbb84a',
            dark: '#a68619',
          },
          brown: '#5c4033',
          tan: '#c2a679',
          black: '#1a1a1a',
          charcoal: '#2d2d2d',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
