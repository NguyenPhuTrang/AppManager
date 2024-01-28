/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "350px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 1024px) { ... }

        xl: "1200px",
        // => @media (min-width: 1280px) { ... }
      },
      boxShadow: {
        'item-product': '0px 4px 8px 0px rgba(92, 107, 192, 0.20), 0px 2px 4px 0px rgba(59, 69, 123, 0.20);',
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

