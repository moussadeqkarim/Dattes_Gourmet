import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#16090C",
        chocolate: "#2A1017",
        date: "#5E1F2E",
        plum: "#3F1722",
        rose: "#8F4655",
        mauve: "#C58D82",
        gold: "#D4BD91",
        cream: "#F3EADF",
        beige: "#FBF6F0",
        taupe: "#74655B"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 24px 60px rgba(38, 19, 23, 0.14)",
        soft: "0 14px 34px rgba(38, 19, 23, 0.10)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, rgba(212,189,145,.82), transparent)"
      }
    }
  },
  plugins: []
};

export default config;
