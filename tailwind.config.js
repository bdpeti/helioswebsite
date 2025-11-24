/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF9E00',
        'bg': '#050406',
        'accent': '#CCFF00',
        'mid': '#FF8603',
        'deep': '#FF6E07',
        'white': '#f0f0f0',
      },
      fontFamily: {
        'mono': ['"Space Mono"', 'monospace'],
        'syne': ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
