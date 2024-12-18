/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#19234d',
          blue: '#2b5a9e',
        },
        accent: {
          orange: '#d9764a',
          'orange-bright': '#de7527',
        },
        neutral: {
          light: '#f5f5f5',
          medium: '#d1d5db',
          dark: '#374151',
        },
      },
      fontFamily: {
        arial: ['Arial', 'sans-serif'],
      },
      transitionProperty: {
        'background-position': 'background-position',
      },
      backgroundSize: {
        '200': '200% 100%',
      },
    },
  },
  plugins: [],
}

