/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "#ffffff", // or any color in hex format
          foreground: "#000000",
        },
      },
    },
    plugins: [],
  }
  