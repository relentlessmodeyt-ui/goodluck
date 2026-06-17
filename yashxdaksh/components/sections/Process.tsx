"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

function Step({ step, index }: { step: (typeof PROCESS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -20 : 20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative grid grid-cols-[auto_1fr] gap-6 pb-16 sm:gap-10"
    >
      {/* Node */}
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-base font-display text-sm text-accent">
          {step.phase}
        </div>
      </div>

      <motion.div style={{ x }} className="pt-1">
        <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
          {step.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {step.deliverables.map((d) => (
            <li
              key={d}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink/70"
            >
              {d}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <div className="max-w-2xl">
          <SectionLabel index="03">Process</SectionLabel>
          <AnimatedHeading
            text="A proven path from idea to impact."
            highlight={["idea", "impact."]}
            className="mt-5 font-display text-display-md font-semibold text-gradient"
          />
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Six deliberate phases. No surprises — just a clear, collaborative
            journey from first conversation to compounding results.
          </p>
        </div>

        <div ref={ref} className="relative mt-16 pl-0">
          {/* Track */}
          <div className="absolute bottom-16 left-6 top-2 w-px -translate-x-1/2 bg-line">
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-accent-sheen"
            />
          </div>
          {PROCESS.map((step, i) => (
            <Step key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
