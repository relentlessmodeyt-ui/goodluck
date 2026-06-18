"use client";

import { motion } from "framer-motion";
import { WHY_CHOOSE, STATS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useUIStore } from "@/store/useUIStore";

export function WhyChooseUs() {
  const setCursorActive = useUIStore((s) => s.setCursorActive);

  return (
    <section id="why" className="relative scroll-mt-24 border-t border-line bg-surface/30 py-section">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              label="Why YashxDaksh"
              title="The obvious choice for ambitious brands."
              description="We're a small senior team that treats your launch like our reputation depends on it — because it does."
            />

            <dl className="mt-12 grid grid-cols-2 gap-6">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div>
                    <dt className="font-display text-4xl font-semibold text-gradient sm:text-5xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-sm text-ink-muted">{s.label}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <ul className="flex flex-col gap-4">
            {WHY_CHOOSE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <motion.li
                  onMouseEnter={() => setCursorActive(true)}
                  onMouseLeave={() => setCursorActive(false)}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="border-glow group flex items-start gap-5 rounded-xl2 bg-surface-raised/60 p-6"
                >
                  <span className="mt-1 font-display text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                </motion.li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
