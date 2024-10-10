const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' if you prefer to use the media-query strategy
  theme: {
    extend: {
      colors: {
        primary: "#30C1D7",
        secondary: "#6b459b",
        dark: {
          background: "red",
          text: "#ffffff",
        },
        light: {
          background: "#ffffff",
          text: "#333333",
        },
      },
    },
  },
  plugins: [],
};
