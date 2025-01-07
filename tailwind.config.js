/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21304E",
        secondary: "#EF4E5D",
        hoversec: "#ef3648",
        success: "#34d399",
      },
    },
  },
  plugins: [require("daisyui")],
};
