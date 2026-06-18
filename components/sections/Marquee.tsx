"use client";

import { Spark } from "@/components/ui/icons";

const ITEMS = [
  "Web Design",
  "Web Development",
  "Branding",
  "UI / UX Design",
  "E-commerce",
  "SEO Optimization",
  "Motion & 3D",
  "Art Direction",
];

/** An infinite, dual-track marquee — pure CSS transform, GPU-friendly. */
export function Marquee() {
  const track = (
    <ul className="flex shrink-0 items-center gap-10 px-5">
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-medium text-ink/70 sm:text-3xl">
          {item}
          <Spark className="h-5 w-5 text-accent/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/30 py-7" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />
      <div className="flex animate-[marquee_38s_linear_infinite] motion-reduce:animate-none">
        {track}
        {track}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
