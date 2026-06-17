"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

/**
 * GPU-cheap custom cursor: a precise dot plus a lagging ring with a trailing
 * label. Pure rAF + transforms, no React re-renders on pointer move.
 * Falls back to the native cursor on touch / reduced-motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { cursorVariant, cursorLabel } = useStore();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  const hasLabel = cursorLabel.length > 0;
  const ringScale = cursorVariant === "hover" && !hasLabel ? 1.5 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-accent/60 transition-[width,height,background-color,border-color] duration-300 ease-smooth"
        style={{
          width: hasLabel ? 84 : 40 * ringScale,
          height: hasLabel ? 84 : 40 * ringScale,
          backgroundColor: hasLabel ? "rgba(91,124,255,0.92)" : "transparent",
          borderColor: hasLabel ? "transparent" : "rgba(91,124,255,0.6)",
        }}
      >
        <span
          className="text-[10px] font-medium uppercase tracking-[0.18em] text-base transition-opacity duration-200"
          style={{ opacity: hasLabel ? 1 : 0 }}
        >
          {cursorLabel}
        </span>
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink transition-opacity duration-300 ease-smooth"
        style={{ opacity: hasLabel ? 0 : 1 }}
      />
    </div>
  );
}
