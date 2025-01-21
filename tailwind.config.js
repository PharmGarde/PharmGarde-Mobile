/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold":["Rubik-Bold","sans-serif"],
        "rubik-extrabold":["Rubik-ExtraBold","sans-serif"],
        "rubik-medium":["Rubik-Medium","sans-serif"],
        "rubik-semibold":["Rubik-SemiBold","sans-serif"],
        "rubik-light":["Rubik-Light","sans-serif"],
      },
      colors: {
        primary: "#007f5f",
        secondary: "#007f5f9d",
        backgroundgray: "#e5e7eb", 
      },
    },
  },
  plugins: [],
};
