"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

/**
 * Services presented as interactive modules: a precise, expandable list on the
 * left, with a live "preview" panel on the right that responds to the active row.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const setCursorActive = useUIStore((s) => s.setCursorActive);
  const current = SERVICES[active];

  return (
    <section id="services" className="relative scroll-mt-24 border-t border-line bg-surface/30 py-section">
      <div className="shell">
        <SectionHeader
          label="Services"
          title="Everything your brand needs to win online."
          description="Six disciplines, one team. Hover a service to explore what's included."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          {/* Interactive list */}
          <ul className="flex flex-col">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04}>
                <li
                  onMouseEnter={() => {
                    setActive(i);
                    setCursorActive(true);
                  }}
                  onMouseLeave={() => setCursorActive(false)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group cursor-pointer border-b border-line py-7 transition-colors duration-300",
                    active === i ? "opacity-100" : "opacity-60 hover:opacity-100",
                  )}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-sm text-accent">{s.index}</span>
                      <h3 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                        {s.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300",
                        active === i ? "rotate-0 bg-accent text-white" : "text-ink-muted group-hover:border-white/30",
                      )}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden pl-10 pr-12 text-sm leading-relaxed text-ink-muted"
                      >
                        <span className="block pt-4">{s.description}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* Live preview panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-glow relative overflow-hidden rounded-xl2 bg-surface-raised p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <span className="font-display text-6xl font-semibold text-white/10">{current.index}</span>
                  <h4 className="mt-2 font-display text-2xl font-semibold">{current.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{current.description}</p>

                  <ul className="mt-7 space-y-3">
                    {current.capabilities.map((c) => (
                      <li key={c} className="flex items-center gap-3 text-sm">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
