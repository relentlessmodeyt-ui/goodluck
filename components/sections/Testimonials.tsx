"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Quote } from "@/components/ui/icons";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const setCursorActive = useUIStore((s) => s.setCursorActive);
  const t = TESTIMONIALS[index];

  const paginate = useCallback((d: number) => {
    setState(([i]) => [(i + d + TESTIMONIALS.length) % TESTIMONIALS.length, d]);
  }, []);

  useEffect(() => {
    const id = setInterval(() => paginate(1), 6500);
    return () => clearInterval(id);
  }, [paginate]);

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-section">
      <div className="shell">
        <SectionHeader
          label="Testimonials"
          title="Brands that trusted the process."
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="border-glow relative overflow-hidden rounded-xl2 bg-surface-raised p-8 sm:p-12">
            <Quote className="h-10 w-10 text-accent/50" />
            <div className="relative mt-6 min-h-[230px] sm:min-h-[200px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl text-balance">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="relative h-12 w-12 overflow-hidden rounded-full border border-line">
                        <Image src={t.avatar} alt={t.author} fill sizes="48px" className="object-cover" />
                      </span>
                      <div>
                        <p className="font-medium text-ink">{t.author}</p>
                        <p className="text-sm text-ink-muted">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-semibold text-accent-gradient">{t.metric.value}</p>
                      <p className="text-xs text-ink-muted">{t.metric.label}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setState([i, i > index ? 1 : -1])}
                onMouseEnter={() => setCursorActive(true)}
                onMouseLeave={() => setCursorActive(false)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-400",
                  i === index ? "w-8 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
