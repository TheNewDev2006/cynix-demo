/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff2fa',
          100: '#dde5f5',
          200: '#bacbef',
          300: '#97b2e9',
          400: '#7498e3',
          500: '#517edd',
          600: '#2e65d7',
          700: '#2551ac',
          800: '#1B3070',
          900: '#12204a',
          950: '#091025',
        },
        accent: {
          DEFAULT: '#E8621A',
        }
      },
    },
  },
  plugins: [],
}
