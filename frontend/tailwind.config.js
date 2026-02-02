/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{vue,js,ts}", "./components/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DB954",
        primaryHover: "#1AA34A",
        accent: "#1ED760",

        background: {
          main: "#121212",
          secondary: "#181818",
          hover: "#282828",
          active: "#2A2A2A",
        },

        text: {
          primary: "#FFFFFF",
          secondary: "#B3B3B3",
          muted: "#727272",
          disabled: "#535353",
        },

        border: "#282828",
      },
    },
  },
  plugins: [],
};
