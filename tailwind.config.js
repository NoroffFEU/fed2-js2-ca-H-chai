/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    fontFamily: {
      display: ["Clash Display", "sans-serif"],
      body: ["Archivo", "sans-serif"],
    },
    colors: {
      "bg-light": "#f2f2eb",
      green: "#025951",
      white: "#ffffff",
      gray: "#4a5568",
    },
    extend: {},
  },
  plugins: [],
};
