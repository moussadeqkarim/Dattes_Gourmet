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
        dark: "#1A0B0E",
        chocolate: "#261317",
        date: "#5A2634",
        plum: "#3A2228",
        rose: "#9B5A6B",
        mauve: "#B77A88",
        gold: "#C8BAA5",
        cream: "#EFE6DA",
        beige: "#F6EEE5",
        taupe: "#6F6258"
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
        "gold-line": "linear-gradient(90deg, transparent, rgba(200,186,165,.78), transparent)"
      }
    }
  },
  plugins: []
};

export default config;
