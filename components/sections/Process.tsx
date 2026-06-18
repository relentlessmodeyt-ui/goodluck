"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PROCESS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A vertical timeline whose progress line fills as the section scrolls through
 * the viewport — turning the process into a guided, cinematic descent.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="process" className="relative scroll-mt-24 py-section">
      <div className="shell">
        <SectionHeader
          label="Process"
          title="A clear path from idea to impact."
          description="No mystery, no scope creep. Six deliberate phases that turn ambition into a website that performs."
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-0">
          {/* Track */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-line sm:left-1/2 sm:-translate-x-1/2" />
          {/* Progress */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-[15px] top-0 h-full w-px origin-top bg-accent-gradient sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="flex flex-col gap-12">
            {PROCESS.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={step.index} delay={0.05}>
                  <div
                    className={`relative flex sm:w-1/2 ${
                      right ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"
                    }`}
                  >
                    {/* Node */}
                    <span
                      className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface-raised font-display text-xs text-accent
                        -left-10 sm:left-auto ${right ? "sm:-left-4" : "sm:-right-4"}`}
                    >
                      {step.index}
                    </span>

                    <div className="border-glow w-full rounded-xl2 bg-surface-raised/60 p-6">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
