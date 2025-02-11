/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'default': '#000', // Black background
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

