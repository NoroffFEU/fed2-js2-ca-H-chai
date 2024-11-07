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
      "bg-pink": "#ffe6ff",
      green: "#025951",
      white: "#ffffff",
      gray: "#4a5568",
      red: "#dc3545",
      "light-green": "rgba(2, 89, 81, 0.2)",
    },
    transitionProperty: {
      "padding-bottom": "padding-bottom",
      scale: "transform",
    },
    transitionTimingFunction: {
      "nav-transition": "cubic-bezier(0.04, 0.04, 0.12, 0.96)",
      "pb-ease": "ease",
      scale: "ease-in-out",
    },
    transitionDuration: {
      "nav-transition": "319ms",
      pb: "400ms",
      scale: "300ms",
    },
    transitionDelay: {
      "nav-transition": "100ms",
    },
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
