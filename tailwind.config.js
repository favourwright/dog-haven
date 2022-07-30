/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#edb507',
        'secondary': '#d60000',
        'tertiary': '#1b2121',
      },
    }
  },
  plugins: [],
}