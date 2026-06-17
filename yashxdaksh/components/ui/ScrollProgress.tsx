"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-accent-sheen"
      style={{ scaleX }}
    />
  );
}
