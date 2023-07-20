/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      brand: '#047d95',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}

