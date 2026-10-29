/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: { extend: {
    colors: { geo: { 50: '#faf8f5', 100: '#f0ebe3', 200: '#e0d6c8', 300: '#c5b8a5', 400: '#a89880', 500: '#b05b28', 600: '#964d22', 700: '#5c5650', 800: '#3d3835', 900: '#33302e', 950: '#2a2725' } },
    fontFamily: { sans: ['Archivo', 'sans-serif'] }
  } },
  plugins: []
};
