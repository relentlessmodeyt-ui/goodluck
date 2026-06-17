"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";

/**
 * Cinematic loading sequence: a counter races to 100 while the wordmark
 * assembles, then the curtain splits to reveal the hero. Skipped instantly for
 * reduced-motion users.
 */
export function Intro() {
  const completeIntro = useStore((s) => s.completeIntro);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      completeIntro();
      return;
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = 2000;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          completeIntro();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [completeIntro]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-radial-spot pointer-events-none absolute inset-0 opacity-60" />
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-baseline gap-1 font-display text-2xl font-semibold tracking-tight"
          >
            <span>Yash</span>
            <span className="text-accent-gradient">x</span>
            <span>Daksh</span>
          </motion.div>

          <div className="relative mt-8 h-px w-56 overflow-hidden bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent-sheen"
              style={{ width: `${count}%` }}
            />
          </div>

          <div className="relative mt-4 font-display text-xs tabular-nums tracking-[0.3em] text-ink-muted">
            {String(count).padStart(3, "0")} — LOADING EXPERIENCE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
