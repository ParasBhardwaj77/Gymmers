/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gym-black': '#0B0B0B',
        'gym-accent': '#E10600',
        'gym-orange': '#FF5F1F',
        'gym-gray': '#1F1F1F',
        'gym-dark': '#0f0f0f',
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
