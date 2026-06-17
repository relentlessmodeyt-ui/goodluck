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
        // Core palette — the YashxDaksh luxury dark system.
        base: "#08090D", // primary background
        surface: {
          DEFAULT: "#171A21", // raised surface
          muted: "#111318", // secondary background
        },
        ink: {
          DEFAULT: "#F8FAFC", // text primary
          muted: "#94A3B8", // text secondary
        },
        accent: {
          DEFAULT: "#5B7CFF", // primary accent — electric indigo
          violet: "#8B5CF6", // secondary accent
        },
        line: "rgba(248,250,252,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display scale (clamp) for confident, responsive headlines.
        "display-xl": ["clamp(2.75rem, 8vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5.5vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 3.25rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        shell: "84rem",
      },
      spacing: {
        gutter: "clamp(1.25rem, 5vw, 5rem)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "accent-sheen":
          "linear-gradient(120deg, #5B7CFF 0%, #8B5CF6 50%, #5B7CFF 100%)",
        "radial-spot":
          "radial-gradient(circle at 50% 0%, rgba(91,124,255,0.18), transparent 60%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        // Signature easing curves — used across the motion system.
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "sheen-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 40s linear infinite",
        "sheen-pan": "sheen-pan 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
