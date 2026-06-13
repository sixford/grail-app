/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#f7f3ec',
        ink: '#1a1a1a',
        rust: '#b5562f',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}