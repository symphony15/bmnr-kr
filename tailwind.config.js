/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eth-blue': '#627EEA',
        'eth-purple': '#8C7CF0',
        'bmnr-green': '#22c55e',
        'surface': '#0f1117',
        'surface-2': '#1a1d27',
        'surface-3': '#22263a',
        'border': '#2a2d3e',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
