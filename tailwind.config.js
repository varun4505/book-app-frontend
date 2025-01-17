/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#CC33FF',
        'secondary' : "#CC33FF",
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841'
      }, 
      fontFamily: {
        'primary' : ["Montserrat", "sans-serif"],
        'secondary' : ["Nunito Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

