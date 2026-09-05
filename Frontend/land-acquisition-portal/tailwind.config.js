/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Government of India inspired palette
        navy: {
          50: '#eef2f7',
          100: '#d4dfeb',
          200: '#a9bfd7',
          300: '#7ea0c3',
          400: '#4a76a3',
          500: '#1f4e79',   // primary action blue
          600: '#173e63',
          700: '#0f2d4a',
          800: '#0a2038',   // header / sidebar
          900: '#071627',   // deepest navy
        },
        saffron: {
          50: '#fff4e8',
          100: '#ffe3c2',
          200: '#ffc98a',
          300: '#ffab4d',
          400: '#ff8f1f',
          500: '#e97a1f',   // accent / CTA
          600: '#c96312',
          700: '#a34f0e',
        },
        indiagreen: {
          500: '#0a7a3c',
          600: '#086530',
        },
        paper: '#f6f5f1',    // warm off-white background, like govt paper
        ink: '#1c2530',
      },
      fontFamily: {
        display: ['"Merriweather"', 'Georgia', 'serif'],
        body: ['"Inter"', '"Noto Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 32, 56, 0.08), 0 1px 0 rgba(10,32,56,0.04)',
      },
    },
  },
  plugins: [],
}
