/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 10px 20px 10px rgba(0, 0, 0, 0.2)',
        'wl': '0 10px 20px 10px white',
      }
    },
  },
  plugins: [],
}

