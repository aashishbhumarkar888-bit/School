import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          sapphire: {
            50: "#EFF6FF",
            100: "#DBEAFE",
            200: "#BFDBFE",
            500: "#3B82F6",
            600: "#2563EB",
            700: "#1D4ED8",
            800: "#1E40AF",
            900: "#1E3A8A",
          },
          gold: {
            50: "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            500: "#F59E0B",
            600: "#D97706",
            700: "#B45309",
            800: "#92400E",
          },
        },
        house: {
          teresa: {
            light: "#38BDF8",
            DEFAULT: "#0284C7",
            dark: "#0369A1",
            bg: "#E0F2FE",
            border: "#BAE6FD",
          },
          amartya: {
            light: "#FDE047",
            DEFAULT: "#D97706",
            dark: "#B45309",
            bg: "#FEF9C3",
            border: "#FDE68A",
          },
          tagore: {
            light: "#34D399",
            DEFAULT: "#059669",
            dark: "#064E3B",
            bg: "#D1FAE5",
            border: "#A7F3D0",
          },
          raman: {
            light: "#FB7185",
            DEFAULT: "#E11D48",
            dark: "#9F1239",
            bg: "#FFE4E6",
            border: "#FECDD3",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
