"use client";

import { useScroll, useTransform, motion } from "framer-motion";

/**
 * A living ambient backdrop for the whole site: slow-drifting accent "auroras"
 * behind a fixed grain layer. It parallaxes gently with scroll so the page
 * always feels alive, never flat. Pure transforms — GPU-friendly, and frozen
 * under reduced-motion via the global CSS safety net.
 */
export function AuroraBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-[10%] -top-[15%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.5] blur-[120px] animate-aurora-1"
        // accent indigo
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,#5B7CFF_0%,transparent_60%)] opacity-40" />
      </motion.div>

      <motion.div
        style={{ y: y2, rotate }}
        className="absolute right-[-15%] top-[20%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.45] blur-[130px] animate-aurora-2"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,#8B5CF6_0%,transparent_60%)] opacity-40" />
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-[-20%] left-[30%] h-[50vmax] w-[50vmax] rounded-full opacity-[0.35] blur-[140px] animate-aurora-3"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,#3a4ad8_0%,transparent_65%)] opacity-40" />
      </motion.div>

      {/* moving fine grain */}
      <div className="absolute inset-0 opacity-[0.04] grain animate-grain mix-blend-overlay" />
      {/* keeps content legible over the auroras */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_40%,rgba(8,9,13,0.6)_100%)]" />
    </div>
  );
}
