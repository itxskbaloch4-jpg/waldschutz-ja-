import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alpine: "#F6F4EF",
        forest: {
          DEFAULT: "#173B2E",
          hover: "#2F5D46",
        },
        federal: "#D62828",
        ink: "#0E0E0E",
        line: "#E8E4D8",
      },
      fontFamily: {
        display: ["var(--font-general-sans)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
