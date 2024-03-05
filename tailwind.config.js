/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      purple: "#F2CCC9",
      pink: "#FCEDE9",
    },
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
