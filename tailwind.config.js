const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Rubik',  ...defaultTheme.fontFamily.sans],
    },
    extend: {
      screens: {
        's-hover': {'raw': '(hover: hover)'},
    },
    height: {
      '128': '36rem',
      '110': '30rem',
    },
      colors: {
        primary: {
          light: "#00cc99",
          DEFAULT: "#00CC99",
          dark: "#00CC99"
        },
        purpleSimplee:{
          light:"#1977F3",
          DEFAULT: "#6461ED",
          dark: "#4C4A9E"
        },
        blueSimpleeMinipyme:{
          light:"#1977F3",
          DEFAULT: "#1977F3",
          dark: "#1977F3"
        },
        blueSimplee:{
          light:"#037AFA",
          DEFAULT: "#037AFA",
          dark: "#037AFA"
        },
        azul:{
          light:"#052F59",
          DEFAULT: "#052F59",
          dark: "#04264A"
        },
        celeste:{
          light: "#E6F9F4",
          DEFAULT: "#E6F9F4",
          dark: "#E6F9F4"
        },
        bluedark:{
          light: "#222232",
          DEFAULT: "#222232",
          dark: "#222232"
        },
        almostGray:{
          light: "#FBFBFB",
          DEFAULT: "#FBFBFB",
          dark: "#FBFBFB"
        },
        almostPureBlack:{
          light: "#222222",
          DEFAULT: "#222222",
          dark: "#222222"
        },
        lightBlack:{
          light: "#333333",
          DEFAULT: "#333333",
          dark: "#333333"
        },
        BlackSecond:{
          light: "#000",
          DEFAULT: "#000",
          dark: "#000"
        },
        NewlightBlack:{
          light: "#141414",
          DEFAULT: "#141414",
          dark: "#141414"
        },
        darkGrey:{
          light: "#797979",
          DEFAULT: "#797979",
          dark: "#797979"
        },
        lightGrey:{
          light: "#C4C4C4",
          DEFAULT: "#C4C4C4",
          dark: "#C4C4C4"
        },
        textBaseColor:{
          light: "#505755",
          DEFAULT: "#505755",
          dark: "#505755"
        },
        errorColor: {
          light: "#EA1051",
          DEFAULT: "#EA1051",
          dark: "#EA1051"
        }
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class', // only generate classes
    }),
  ],
};
