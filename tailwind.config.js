/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'bg': 'var(--color-bg)',
        'accent': 'var(--color-accent)',
        'mid': '#FF8603',
        'deep': '#FF6E07',
        'white': 'var(--color-text)',
      },
      fontFamily: {
        'mono': ['"Space Mono"', 'monospace'],
        'syne': ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
