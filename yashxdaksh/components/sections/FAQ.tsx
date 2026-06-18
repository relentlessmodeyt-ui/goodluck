"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Plus } from "@/components/ui/icons";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const setCursorActive = useUIStore((s) => s.setCursorActive);

  return (
    <section id="faq" className="relative scroll-mt-24 border-t border-line bg-surface/30 py-section">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          label="FAQ"
          title="Answers, before you ask."
          description="Still curious? The estimator below starts a real conversation in under a minute."
        />

        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 0.03}>
                <div className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onMouseEnter={() => setCursorActive(true)}
                    onMouseLeave={() => setCursorActive(false)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-medium tracking-tight sm:text-xl">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-400",
                        isOpen ? "rotate-45 bg-accent text-white" : "text-ink-muted",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[60ch] pb-6 pr-12 text-sm leading-relaxed text-ink-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
