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
        house: {
          teresa: {
            light: "#38BDF8",
            DEFAULT: "#0EA5E9",
            mid: "#2563EB",
            dark: "#1E3A8A",
            glow: "rgba(14, 165, 233, 0.25)",
          },
          amartya: {
            light: "#FEF08A",
            DEFAULT: "#FDE047",
            mid: "#F59E0B",
            dark: "#B45309",
            glow: "rgba(245, 158, 11, 0.25)",
          },
          tagore: {
            light: "#6EE7B7",
            DEFAULT: "#34D399",
            mid: "#10B981",
            dark: "#064E3B",
            glow: "rgba(16, 185, 129, 0.25)",
          },
          raman: {
            light: "#FDA4AF",
            DEFAULT: "#FB7185",
            mid: "#EF4444",
            dark: "#881337",
            glow: "rgba(239, 68, 68, 0.25)",
          },
        },
        obsidian: {
          950: "#05080F",
          900: "#070B14",
          850: "#0B1120",
          800: "#0F172A",
          700: "#1E293B",
          600: "#334155",
        },
        pearl: {
          50: "#FDFDFD",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
          ivory: "#F7F5EF",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-hero": "radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(245, 158, 11, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(239, 68, 68, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.15) 0px, transparent 50%)",
      },
      animation: {
        "aurora-slow": "aurora 20s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
