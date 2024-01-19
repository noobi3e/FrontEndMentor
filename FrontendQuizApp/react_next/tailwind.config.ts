import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
export default config
