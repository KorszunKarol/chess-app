/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  
  theme: {
    extend: {
      colors: {
        'chess-primary': '#2c3e50',
        'chess-secondary': '#ecf0f1',
        'chess-accent': '#e74c3c',
        'chess-background': '#f5f5f5',
        'chess-text': '#333',
        'chess-board-light': '#f0d9b5',
        'chess-board-dark': '#b58863',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
