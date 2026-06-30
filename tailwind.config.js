/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF4D00',
          'orange-dark': '#E64500',
          grey: '#808080',
        },
      },
      fontFamily: {
        display: ['"Big Shoulders"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
