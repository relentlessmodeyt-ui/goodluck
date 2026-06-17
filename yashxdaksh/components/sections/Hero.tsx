"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TRUST_INDICATORS } from "@/lib/data";

// 3D is heavy + client-only: lazy-load it and keep it out of the server bundle.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="none" aria-hidden>
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax layers — copy drifts up and fades faster than the scene.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient gradient + grain backdrop */}
      <motion.div
        style={{ scale: glowScale }}
        className="bg-radial-spot pointer-events-none absolute inset-0"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[120px]" />

      {/* 3D centerpiece */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Copy layer */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="shell relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="eyebrow mb-7"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Premium Web Design &amp; Development
        </motion.span>

        <AnimatedHeading
          as="h1"
          text="We Build Websites That Make Brands Impossible to Ignore."
          delay={0.5}
          highlight={["Impossible", "Ignore"]}
          className="max-w-5xl font-display text-display-lg font-semibold text-gradient"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
        >
          YashxDaksh creates immersive digital experiences that elevate brands,
          build trust, and drive measurable growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#contact" variant="primary" cursorLabel="Go">
            Start Your Project
          </MagneticButton>
          <MagneticButton href="#work" variant="secondary" cursorLabel="View">
            Explore Our Work
          </MagneticButton>
        </motion.div>

        {/* Trust indicators */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          {TRUST_INDICATORS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
              <CheckIcon />
              {item}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: copyOpacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink-muted">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-line">
          <motion.span
            className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
