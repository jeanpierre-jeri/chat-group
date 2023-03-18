/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#252329',
        secondary: '#120F13',
        content: '#E0E0E0',
        gray: {
          100: '#828282',
          200: '#252329',
          300: '#3C393F',
          400: '#BDBDBD'
        },
        dark: '#0B090C'
      }
    }
  },
  plugins: []
}
