/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      borderRadius: {
        main: 8,
      },
      fontFamily: {
        main500: "Quicksand-Light",
        main600: "Quicksand-Regular",
        main700: "Quicksand-Medium",
        main800: "Quicksand-SemiBold",
        main900: "Quicksand-Bold",
      },
      colors: {
        primary: "#ff786f",
        secondary: "#FF5545",
        tertiary: "#828282",
        background: "#E5F6FE",
        success: "#6EC166",
        error: "#FF5545",
        subtle: "#D2D7E5",
      },
    },
  },
  plugins: [],
}
