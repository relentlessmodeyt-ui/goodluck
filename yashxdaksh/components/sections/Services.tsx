"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { useStore } from "@/store/useStore";

export function Services() {
  const [active, setActive] = useState<string | null>(SERVICES[0].id);
  const setCursor = useStore((s) => s.setCursor);

  return (
    <section id="services" className="relative scroll-mt-24 bg-surface-muted py-28 sm:py-36">
      <div className="shell">
        <div className="max-w-2xl">
          <SectionLabel index="02">Services</SectionLabel>
          <AnimatedHeading
            text="A full studio, end to end."
            highlight={["end", "to", "end."]}
            className="mt-5 font-display text-display-md font-semibold text-gradient"
          />
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Strategy, design, engineering and growth under one roof — so nothing
            gets lost in translation between vision and launch.
          </p>
        </div>

        <div className="mt-14 border-t border-line">
          {SERVICES.map((service) => {
            const isOpen = active === service.id;
            return (
              <div
                key={service.id}
                className="group border-b border-line"
                onMouseEnter={() => {
                  setActive(service.id);
                  setCursor("hover");
                }}
                onMouseLeave={() => setCursor("default")}
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : service.id)}
                  aria-expanded={isOpen}
                  className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
                >
                  {/* Accent sweep on active */}
                  <span
                    className="pointer-events-none absolute inset-0 -z-0 origin-left bg-gradient-to-r from-accent/[0.06] to-transparent transition-transform duration-500 ease-smooth"
                    style={{ transform: isOpen ? "scaleX(1)" : "scaleX(0)" }}
                  />
                  <span className="relative font-display text-sm tabular-nums text-accent/70">
                    {service.index}
                  </span>
                  <span className="relative">
                    <span
                      className="font-display text-2xl font-medium tracking-tight transition-colors duration-300 sm:text-4xl"
                      style={{ color: isOpen ? "#F8FAFC" : "#94A3B8" }}
                    >
                      {service.title}
                    </span>
                  </span>
                  <span
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors duration-300"
                    style={{ borderColor: isOpen ? "rgba(91,124,255,0.5)" : undefined }}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg leading-none text-ink"
                    >
                      +
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-9 pl-0 sm:grid-cols-[1fr_1fr] sm:pl-[3.25rem]">
                        <p className="max-w-md text-sm leading-relaxed text-ink-muted">
                          {service.summary}
                        </p>
                        <ul className="flex flex-wrap gap-2 self-start sm:justify-end">
                          {service.capabilities.map((c) => (
                            <li
                              key={c}
                              className="rounded-full border border-line bg-base/40 px-3.5 py-1.5 text-xs text-ink/80"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
