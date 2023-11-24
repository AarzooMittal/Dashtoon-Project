/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#C4D7F2',
        customPink: '#db7093',
        customblue: '#6c9ee5',
      },
    },
  },
  plugins: [],
}