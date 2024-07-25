/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#ff8903",
        "accent": "#ff8903",
      },
      fontSize: {
        "header": "4rem",
        "title": "1.5rem",
      }
    },
  },
  plugins: [],
}

