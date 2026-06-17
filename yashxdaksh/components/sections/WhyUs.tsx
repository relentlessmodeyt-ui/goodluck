"use client";

import { STATS, WHY_US } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function WhyUs() {
  return (
    <section id="why" className="relative scroll-mt-24 bg-surface-muted py-28 sm:py-36">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <SectionLabel index="04">Why YashxDaksh</SectionLabel>
            <AnimatedHeading
              text="The obvious choice for ambitious brands."
              highlight={["obvious", "choice"]}
              className="mt-5 font-display text-display-md font-semibold text-gradient"
            />
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
              We pair the taste of a creative studio with the rigor of a senior
              engineering team. The result is work that looks remarkable and
              performs even better.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-surface-muted p-6">
                  <div className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    <CountUp value={stat.value} />
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-ink-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reasons */}
          <ul className="flex flex-col gap-3">
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <li className="group glass relative overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-accent/30">
                  <div className="flex items-start gap-5">
                    <span className="font-display text-sm tabular-nums text-accent/70">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/[0.07] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
