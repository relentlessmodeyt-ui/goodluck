"use client";

import { AnimatedHeading } from "./AnimatedHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="eyebrow">
          <span className="h-px w-8 bg-accent/60" />
          {label}
        </span>
      </Reveal>
      <AnimatedHeading
        as="h2"
        text={title}
        className={cn(
          "max-w-[20ch] text-display-sm font-semibold text-balance",
          align === "center" && "max-w-[24ch]",
        )}
      />
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-[52ch] text-base leading-relaxed text-ink-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
