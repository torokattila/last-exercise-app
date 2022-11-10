/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blues: ['', '#4A9ECB'],
        greys: ['', '#6C6C6C']
      },
    },
  },
  plugins: [],
};
