"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import type { Project } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { ArrowUpRight } from "@/components/ui/icons";
import { useUIStore } from "@/store/useUIStore";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const setCursorActive = useUIStore((s) => s.setCursorActive);
  const wide = index % 3 === 0;

  return (
    <Reveal
      delay={(index % 2) * 0.08}
      className={wide ? "lg:col-span-7" : "lg:col-span-5"}
    >
      <Tilt className="h-full">
      <motion.article
        whileHover="hover"
        onMouseEnter={() => setCursorActive(true)}
        onMouseLeave={() => setCursorActive(false)}
        className="group border-glow relative h-full overflow-hidden rounded-xl2 bg-surface-raised"
      >
        {/* Media */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <motion.div
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={`${project.client} — ${project.category}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(80% 80% at 50% 100%, ${project.accent}22, transparent)` }}
          />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="glass rounded-full px-3 py-1 text-[11px] tracking-wide text-ink"
              >
                {t}
              </span>
            ))}
          </div>

          <motion.div
            variants={{ hover: { opacity: 1, y: 0 } }}
            initial={{ opacity: 0, y: 8 }}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: project.accent }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Body */}
        <div className="p-7">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight">{project.title}</h3>
            <span className="text-xs text-ink-muted">{project.year}</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">{project.category}</p>

          <div className="mt-6 grid gap-4 border-t border-line pt-5 text-sm">
            <p className="text-ink-muted">
              <span className="text-ink/80">Problem.</span> {project.problem}
            </p>
            <p className="text-ink-muted">
              <span className="text-ink/80">Solution.</span> {project.solution}
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {project.results.map((r) => (
              <div key={r.label} className="rounded-lg border border-line bg-base/40 p-3">
                <dt className="text-[11px] uppercase tracking-wide text-ink-muted">{r.label}</dt>
                <dd
                  className="mt-1 font-display text-xl font-semibold"
                  style={{ color: project.accent }}
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.article>
      </Tilt>
    </Reveal>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="relative scroll-mt-24 py-section">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            label="Selected Work"
            title="Case studies, not screenshots."
            description="A look at recent partners — the problem we inherited, what we built, and the numbers that followed."
          />
          <Reveal>
            <span className="font-display text-sm text-ink-muted">
              {String(PROJECTS.length).padStart(2, "0")} featured projects
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
