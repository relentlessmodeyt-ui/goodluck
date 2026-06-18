"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A short cinematic loading sequence: a counter races to 100 while the brand
 * mark settles, then the curtain lifts to reveal the hero. Kept under ~2s so it
 * builds anticipation without testing patience.
 */
export function Preloader() {
  const setLoading = useUIStore((s) => s.setLoading);
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCount(100);
      setDone(true);
      setLoading(false);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1700;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setLoading(false), 650);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [reduced, setLoading]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-radial-fade" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex items-baseline gap-1 font-display text-2xl font-semibold tracking-tight"
          >
            Yash<span className="text-accent-gradient">x</span>Daksh
          </motion.div>

          <div className="relative mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent-gradient"
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>

          <div className="mt-4 font-display text-xs tabular-nums tracking-[0.3em] text-ink-muted">
            {String(count).padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
