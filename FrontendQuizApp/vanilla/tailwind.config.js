/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#313E51',
        primaryDark: '#2C3949',
        primaryLight: '#3C4C67',
        secondary: '#A529F5',
      },
    },
  },
  plugins: [],
}
