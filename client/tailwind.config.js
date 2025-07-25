// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sushi: {
          orange: "#FF7744",
          pink: "#FFAEBB",
          wasabi: "#7DBA4B",
          soy: "#3B1F1F",
          rice: "#FAF8F5",
          seaweed: "#2E3A29",
        },
      },
      fontFamily: {
        sushi: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
