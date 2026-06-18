import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // YashxDaksh brand system
        base: "#08090D", // primary background
        surface: {
          DEFAULT: "#111318", // secondary background
          raised: "#171A21", // surface / cards
        },
        accent: {
          DEFAULT: "#5B7CFF", // primary accent (electric indigo)
          violet: "#8B5CF6", // secondary accent
        },
        ink: {
          DEFAULT: "#F8FAFC", // text primary
          muted: "#94A3B8", // text secondary
        },
        line: "rgba(248,250,252,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // fluid display sizes
        "display-sm": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(3.5rem, 11vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
      },
      maxWidth: {
        shell: "1320px",
      },
      spacing: {
        section: "clamp(6rem, 14vh, 11rem)",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #5B7CFF 0%, #8B5CF6 100%)",
        "radial-fade": "radial-gradient(120% 120% at 50% 0%, rgba(91,124,255,0.12) 0%, rgba(8,9,13,0) 55%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(8%,6%,0) scale(1.15)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.1)" },
          "50%": { transform: "translate3d(-10%,8%,0) scale(0.9)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(0.95)" },
          "50%": { transform: "translate3d(6%,-8%,0) scale(1.2)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(-4%,3%)" },
          "50%": { transform: "translate(3%,-5%)" },
          "75%": { transform: "translate(-3%,-2%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 2.2s infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
        "aurora-1": "aurora-1 22s ease-in-out infinite",
        "aurora-2": "aurora-2 26s ease-in-out infinite",
        "aurora-3": "aurora-3 30s ease-in-out infinite",
        grain: "grain 8s steps(4) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
