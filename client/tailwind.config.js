/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blues: ['', '#4A9ECB'],
        greys: ['', '#6C6C6C'],
      },
      spacing: {
        0: '0px',
        0.5: '4px',
        1: '8px',
        1.5: '12px',
        2: '16px',
        2.5: '20px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        10: '80px',
        11: '88px',
        12: '96px',
        13: '104px',
        14: '112px',
        15: '120px',
        16: '128px',
        17: '136px',
        18: '144px',
        23: '184px',
        24: '192px',
        28: '224px',
        29: '232px',
        30: '240px',
        31: '248px',
        32: '256px',
        58: '464px',
        59: '472px',
        60: '480px',
        61: '488px',
        62: '496px',
        63: '504px',
        64: '512px',
        65: '520px',
        80: '640px',
        98: '784px',
      },
    },
  },
  plugins: [],
};
