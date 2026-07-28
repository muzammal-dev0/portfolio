/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#071018',
          50: '#eef6f8',
          100: '#d5e8ee',
          200: '#a8c9d6',
          300: '#6a9aab',
          400: '#3d6f82',
          500: '#2a5160',
          600: '#1c3844',
          700: '#142833',
          800: '#0d1b24',
          900: '#071018',
        },
        signal: {
          DEFAULT: '#3dffd8',
          dim: '#1fb89a',
          soft: 'rgba(61, 255, 216, 0.12)',
        },
        ember: {
          DEFAULT: '#f5c56b',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
