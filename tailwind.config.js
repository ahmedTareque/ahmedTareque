/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        ink:   '#0A0A0A',
        paper: '#F2EDE6',
        teal:  '#00B4A2',
        coral: '#FF5C3A',
        muted: '#6B6B6B',
      },
    },
  },
  plugins: [],
}
