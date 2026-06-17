"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useStore } from "@/store/useStore";

const AUTOPLAY = 6000;

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const setCursor = useStore((s) => s.setCursor);

  const paginate = useCallback((d: number) => {
    setState(([i]) => [(i + d + TESTIMONIALS.length) % TESTIMONIALS.length, d]);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => paginate(1), AUTOPLAY);
    return () => clearInterval(id);
  }, [paused, paginate, index]);

  const t = TESTIMONIALS[index];

  return (
    <section
      className="relative scroll-mt-24 py-28 sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <SectionLabel index="05">Testimonials</SectionLabel>

        <div className="relative mt-10 min-h-[320px] sm:min-h-[280px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={t.id}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center"
            >
              <blockquote className="font-display text-2xl font-medium leading-[1.3] tracking-tight text-gradient sm:text-4xl">
                <span className="text-accent">“</span>
                {t.quote}
                <span className="text-accent">”</span>
              </blockquote>

              <figcaption className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-sheen font-display text-base font-semibold text-base">
                    {t.initials}
                  </span>
                  <div>
                    <div className="font-medium text-ink">{t.author}</div>
                    <div className="text-sm text-ink-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
                <div className="glass w-fit rounded-2xl px-5 py-4">
                  <div className="font-display text-3xl font-semibold tracking-tight text-accent-gradient">
                    {t.metric.value}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{t.metric.label}</div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
          <div className="flex gap-2">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 36 : 14,
                  background: i === index ? "#5B7CFF" : "rgba(248,250,252,0.18)",
                }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[
              { d: -1, label: "Previous", path: "M15 18l-6-6 6-6" },
              { d: 1, label: "Next", path: "M9 6l6 6-6 6" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => paginate(b.d)}
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path d={b.path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
