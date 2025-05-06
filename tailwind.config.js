// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Esto ya está correcto
  theme: {
    extend: {
      fontFamily: {
        opensans: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [heroui()],
};
