"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useUIStore } from "@/store/useUIStore";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Initialises Lenis smooth scrolling and pipes global scroll progress into the
 * UI store. Disabled automatically when the user prefers reduced motion.
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const setScrollProgress = useUIStore((s) => s.setScrollProgress);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setScrollProgress(progress);
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // expose for anchor links
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced, setScrollProgress]);
}

/** Smoothly scroll to a selector, falling back to native behaviour. */
export function scrollToSection(target: string) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = document.querySelector(target);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -40 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
