/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        primary: '#1A202C',
        secondary: '#3161FF',
        success: '#0F8B42',
        danger: '#EB4335',
        warning: '#f59e0b',
        background: '#E7E7E7',
        card: '#FFFFFF',
      },
    },
  },
  plugins: [],
} 