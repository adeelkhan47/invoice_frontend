/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,vue,js,jsx}"],
  theme: {
    extend: {
      colors: {
        themePrimary: "#e77491",
        themePrimaryLight: "#e7749138",
        themeTextPrimary: "#595959",
      },
    },
  },
  plugins: [],
};
