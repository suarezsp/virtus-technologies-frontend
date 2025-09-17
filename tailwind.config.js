/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        virtus: {
          dark: "#030307",
          dark_2: "#0b0b0cff",
          gray: "#070709ff",
          blue: "#3166eb",
          dark_transparent: "#03030741",
          light: "#f7f7fe",
          light_2: "#313134ff",
          red: "#eb3131",        // rojo vivo futurista (contrasta con azul)
          red_soft: "#792828ff",   // rojo oscuro para fondos/accent
          green: "#4ad198ff",      // verde neón suave (armónico con azul)
          green_soft: "#1c6549ff", // verde oscuro profundo para backgrounds
          accent_purple: "#6846b8ff", // púrpura tecnológico (puente entre azul y rojo)
          accent_teal: "#31c7eb",
        },
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-1750px)" }, // 7 imágenes * 250px
        },
      },
      animation: {
        scroll: "scroll 40s linear infinite",
      },
    },
  },
  plugins: [],
}