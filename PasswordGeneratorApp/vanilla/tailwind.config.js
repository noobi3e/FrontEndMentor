/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A5FFAF",
        prWhite: "#E2E6EA",
        prBlack: "#111115",
        prBlack2: "#24232A",
        prGray: "hsl(251,9%,53%)"
      }
    },
  },
  plugins: [],
}

