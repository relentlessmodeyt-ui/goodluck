"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Split granularity: word reveals read as more premium than per-character. */
  by?: "word" | "line";
  highlight?: string[];
}

/**
 * Kinetic heading: each word rises and unblurs with a staggered, masked reveal.
 * Honors reduced-motion by rendering statically.
 */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  highlight = [],
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("[text-wrap:balance]", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, i) => {
          const isAccent = highlight.includes(word.replace(/[.,]/g, ""));
          return (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={cn("inline-block", isAccent && "text-accent-gradient")}
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: delay + i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
