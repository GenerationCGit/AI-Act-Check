import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFCE00",
          black: "#232323",
          white: "#FFFFFF",
          "off-white": "#F2EDE7",
        },
      },
      fontFamily: {
        sans: [
          "Uncut Sans",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        heading: "-0.03em",
      },
      maxWidth: {
        content: "780px",
      },
    },
  },
  plugins: [],
};

export default config;
