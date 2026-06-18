"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, ArrowUpRight, Bolt, Check, Spark, Star } from "@/components/ui/icons";
import { TRUST_INDICATORS } from "@/lib/data";
import { useUIStore } from "@/store/useUIStore";

// 3D is client-only and lazy — keeps the server payload tiny.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const TRUST_ICONS = [Bolt, Star, Spark, Check];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 + i * 0.12 },
  }),
};

export function Hero() {
  const loading = useUIStore((s) => s.loading);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient gradient + grain */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] grain mix-blend-soft-light" aria-hidden />

      {/* 3D centerpiece — only mounts once the preloader finishes */}
      <div className="absolute inset-0 z-0">{!loading && <HeroScene />}</div>

      {/* Soft vignette so type stays readable over the scene */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_120%_at_50%_50%,transparent_30%,rgba(8,9,13,0.55)_75%,#08090d_100%)]"
        aria-hidden
      />

      <div className="shell relative z-10 flex flex-col items-center text-center">
        <motion.span
          custom={0}
          variants={fade}
          initial="hidden"
          animate={loading ? "hidden" : "show"}
          className="eyebrow mb-7 rounded-full border border-line bg-white/[0.03] px-4 py-2 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Premium Digital Agency · Booking 2026
        </motion.span>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate={loading ? "hidden" : "show"}
          className="max-w-[16ch] font-display text-display-lg font-semibold text-balance"
        >
          We Build Websites That Make Brands{" "}
          <span className="text-accent-gradient">Impossible to Ignore.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate={loading ? "hidden" : "show"}
          className="mt-7 max-w-[58ch] text-base leading-relaxed text-ink-muted sm:text-lg"
        >
          YashxDaksh creates immersive digital experiences that elevate brands,
          build trust, and drive measurable growth.
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate={loading ? "hidden" : "show"}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#contact" variant="primary" ariaLabel="Start your project">
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost" ariaLabel="Explore our work">
            Explore Our Work
            <ArrowUpRight className="h-4 w-4 opacity-70" />
          </MagneticButton>
        </motion.div>

        <motion.ul
          custom={4}
          variants={fade}
          initial="hidden"
          animate={loading ? "hidden" : "show"}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-ink-muted"
        >
          {TRUST_INDICATORS.map((label, i) => {
            const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
            return (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent" />
                {label}
              </li>
            );
          })}
        </motion.ul>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink-muted">
          Scroll
          <span className="flex h-9 w-5 justify-center rounded-full border border-line p-1">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
