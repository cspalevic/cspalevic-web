const autoprefixer = require("autoprefixer");
const custom = require("./custom");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: "'Roboto'",
      colors: {
        "primary-blue": "#0078d4",
      },
    },
  },
  plugins: [custom(), autoprefixer()],
};
