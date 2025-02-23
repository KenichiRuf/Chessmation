/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          green: {
            300: '#86efac',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          yellow: {
            400: '#facc15',
          },
        },
      },
    },
    plugins: [],
  }