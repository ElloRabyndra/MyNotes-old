/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
    extend: {
      colors: {
        main: "#fbbf24",
        highlight: "#1e1e1e",
        secondary: "#262626"
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25px)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 2s ease-in-out forwards",
        "floating": "floating 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
