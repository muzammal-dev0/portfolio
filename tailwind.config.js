/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          50: '#f7f7f5',
          100: '#ebebe8',
          200: '#d4d4d0',
          300: '#a3a39c',
          400: '#73736c',
          500: '#52524c',
          600: '#3a3a36',
          700: '#262623',
          800: '#1a1a18',
          900: '#111111',
        },
        mark: {
          DEFAULT: '#e11d48',
          dim: '#be123c',
          soft: 'rgba(225, 29, 72, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
