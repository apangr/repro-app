const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  /*darkMode: "media", //Based on the browser’s color scheme preference. (Set by Default)*/
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9E1F63",
          50: "#FAE5F0",
          100: "#F4C8DF",
          200: "#EA94C2",
          300: "#DF5DA2",
          400: "#D52A85",
          600: "#801950",
          700: "#5E123B",
          800: "#400D28",
          900: "#1E0613",
          950: "#11030B",
        },
        secondary: "#FF10AA",
       'fanatyx-bg': '#EFEAF4',
       'fanatyx-bg-home': '#E6E7E8'
      },
      fontFamily: {
        sans: ["Figtree, sans-serif", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "sidebar-breakpoint": { max: "1159px" },
        // => @media (max-width: 1159px) { ... }
        tablet: { max: "768px" },
        // => @media (max-width: 768px) { ... }
      },
      flex: {
        "post-item": "1 0 0%",
        "0-auto": "0 0 auto",
      },
      backgroundImage: {
        "profile-default-banner":
          "url('src/assets/angular.png')",
      },
      boxShadow: {
        dialog: "0 0 45px rgba(0, 0, 0, 0.25)",
        topBox: "0 -4px 10px 0 rgba(0,0,0,0.17);",
      },
      scale: {
        '-1': '-1'
      },
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          color: theme("#252525"),
        },
      },
    }),
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
