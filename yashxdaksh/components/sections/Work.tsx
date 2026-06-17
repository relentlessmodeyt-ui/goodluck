"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useStore } from "@/store/useStore";

export function Work() {
  const [active, setActive] = useState(0);
  const setCursor = useStore((s) => s.setCursor);
  const project = PROJECTS[active];

  return (
    <section id="work" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="01">Selected Work</SectionLabel>
            <AnimatedHeading
              text="Work that earns attention."
              highlight={["attention."]}
              className="mt-5 max-w-2xl font-display text-display-md font-semibold text-gradient"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            A selection of recent partnerships. Every project is a story of
            problem, craft and measurable outcome.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Project list */}
          <ul className="flex flex-col">
            {PROJECTS.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseEnter={() => {
                      setActive(i);
                      setCursor("hover", "View");
                    }}
                    onMouseLeave={() => setCursor("default")}
                    onFocus={() => setActive(i)}
                    className="group w-full border-b border-line py-6 text-left"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span
                        className="font-display text-3xl font-medium tracking-tight transition-colors duration-300 sm:text-4xl"
                        style={{ color: isActive ? "#F8FAFC" : "#94A3B8" }}
                      >
                        {p.title}
                      </span>
                      <span className="shrink-0 text-xs text-ink-muted">{p.year}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <span className="text-sm text-ink-muted">{p.category}</span>
                      <motion.span
                        className="text-xs font-medium uppercase tracking-[0.2em]"
                        style={{ color: p.accent }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                      >
                        Case study →
                      </motion.span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Active preview */}
          <div className="relative lg:sticky lg:top-28 lg:h-fit">
            <AnimatePresence mode="wait">
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass relative overflow-hidden rounded-4xl p-8 sm:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px]"
                  style={{ background: project.accent, opacity: 0.22 }}
                />
                {/* Faux device frame / visual */}
                <div className="relative mb-8 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-muted">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${project.accent}40, transparent 60%)`,
                    }}
                  />
                  <span
                    className="font-display text-5xl font-semibold tracking-tight sm:text-7xl"
                    style={{ color: project.accent }}
                  >
                    {project.client}
                  </span>
                </div>

                <div className="relative flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <dl className="relative mt-7 space-y-4">
                  {[
                    ["Problem", project.problem],
                    ["Solution", project.solution],
                    ["Result", project.results],
                  ].map(([label, body]) => (
                    <div key={label} className="grid grid-cols-[80px_1fr] gap-4">
                      <dt className="pt-0.5 text-xs uppercase tracking-[0.2em] text-ink-muted">
                        {label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink/90">{body}</dd>
                    </div>
                  ))}
                </dl>

                <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                        style={{ color: project.accent }}
                      >
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs text-ink-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <p className="text-sm text-ink-muted">
            More case studies available on request —{" "}
            <a href="#contact" className="text-accent underline-offset-4 hover:underline">
              get in touch
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
