// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Tu configuración original
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // Lo que HeroUI necesita
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['"Open Sans"', 'sans-serif'],
      },
    }, // Aquí puedes seguir extendiendo tu theme si lo necesitas
  },
  darkMode: "class", // Requerido por HeroUI para el modo oscuro
  plugins: [heroui()], // Activa el plugin de HeroUI
};
