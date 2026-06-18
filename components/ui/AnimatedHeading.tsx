"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  /** Optional node rendered after the animated words (e.g. an accent span). */
  trailing?: ReactNode;
};

const container = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
};

const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Kinetic, word-by-word heading reveal. Each word slides up from behind a mask.
 * Falls back to plain text under reduced-motion.
 */
export function AnimatedHeading({
  text,
  as = "h2",
  className,
  delay = 0,
  trailing,
}: AnimatedHeadingProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return createElement(
      as,
      { className: cn("font-display", className) },
      text,
      trailing,
    );
  }

  return (
    <motion.div
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={cn("font-display", className)}
    >
      {createElement(
        as,
        { className: "contents" },
        words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span variants={word} className="inline-block pb-[0.12em]">
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        )),
        trailing,
      )}
    </motion.div>
  );
}
