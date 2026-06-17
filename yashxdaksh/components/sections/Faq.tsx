"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function Faq() {
  const [open, setOpen] = useState<string | null>(FAQS[0].id);

  return (
    <section id="faq" className="relative scroll-mt-24 bg-surface-muted py-28 sm:py-36">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <SectionLabel index="06">FAQ</SectionLabel>
            <AnimatedHeading
              text="Questions, answered."
              highlight={["answered."]}
              className="mt-5 font-display text-display-md font-semibold text-gradient"
            />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-muted">
              Still curious about something? Reach out — we&apos;re happy to talk
              specifics before you commit.
            </p>
          </div>

          <div>
            {FAQS.map((faq) => {
              const isOpen = open === faq.id;
              return (
                <div key={faq.id} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-medium tracking-tight sm:text-xl">
                      {faq.question}
                    </span>
                    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                      <span className="absolute h-0.5 w-3.5 bg-accent" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute h-0.5 w-3.5 bg-accent"
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-sm leading-relaxed text-ink-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
