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
    },
    transitionTimingFunction: {
      "nav-transition": "cubic-bezier(0.04, 0.04, 0.12, 0.96)",
    },
    transitionDuration: {
      "nav-transition": "319ms", // equivalent to 0.3192s
    },
    transitionDelay: {
      "nav-transition": "100ms", // equivalent to 0.1008s
    },
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
