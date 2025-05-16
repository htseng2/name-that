/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        shrikhand: ["Shrikhand", "cursive"],
      },
      screens: {
        w852: "852px",
        w1194: "1194px",
        w1280: "1280px",
        w1366: "1366px",
        w1440: "1440px",
        w1920: "1920px",
        w2560: "2560px",
        // Based on App.css, we also have implicit breakpoints
        // For max-width: 1194px, we can use Tailwind's default `lg` (1024px) or `xl` (1280px) or stick to custom.
        // Let's use the custom ones for now to match existing styles closely.
      },
      backgroundImage: {
        "radial-app-content":
          "radial-gradient(circle at center, #005d9d, #053b60)",
      },
      textShadow: {
        logo: "-0.0238em -0.0238em 0 #0e153c, 0.0238em -0.0238em 0 #0e153c, -0.0238em 0.0238em 0 #0e153c, 0.0238em 0.0238em 0 #0e153c",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOut: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        buttonBlink: {
          from: { opacity: "1" },
          to: { opacity: "0.5" },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out forwards",
        slideOut: "slideOut 0.3s ease-in forwards",
        buttonBlink: "buttonBlink 800ms ease-in-out infinite alternate",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-stroke-logo": {
          "-webkit-text-stroke-width": "0.0476em",
          "-webkit-text-stroke-color": theme("colors.logoblue", "#0e153c"),
          "-webkit-text-fill-color": theme("colors.logoyellow", "#fbd11e"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
