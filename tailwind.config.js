/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this includes your components
    "./src/app/**/.{js,ts,jsx,tsx,mdx}",
    "./src/components//*.{js,ts,jsx,tsx,mdx}",
  ],
  layers: {
    theme: {},
    base: {},
    components: {},
    utilities: {},
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
