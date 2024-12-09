/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      writingMode: {
        vertical: "vertical-rl", // This makes text vertical
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "867px",
        lg: "1024px",
        xl: "1280px",
      },
      animation: {
        twinkle: "twinkle 3s linear infinite",
      },
      keyframes: {
        expand: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
