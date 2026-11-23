/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cool blue-black ink scale (token name kept so every page picks it up)
        ink: {
          DEFAULT: '#0A0A0A',
          50: '#FAFAFA',
          100: '#F2F2F2',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#6B6B6B',
          600: '#4D4D4D',
          700: '#333333',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },
        // Single cobalt accent
        mark: {
          DEFAULT: '#0A0A0A',
          dim: '#333333',
          soft: '#F2F2F2',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
