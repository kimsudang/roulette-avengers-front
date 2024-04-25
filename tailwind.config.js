/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'custom-pink-1': '#FFE5EC',
        'custom-pink-2': '#FFC2D1',
        'custom-pink-3': '#FFB3C6',
        'custom-pink-4': '#FF8FAB',
        'custom-pink-5': '#FB6F92',
      },
    },
  },
  plugins: [],
};