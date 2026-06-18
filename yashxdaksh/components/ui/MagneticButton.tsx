"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";
import { scrollToSection } from "@/hooks/useSmoothScroll";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * A button that subtly follows the cursor (magnetic effect) and grows the
 * custom cursor on hover. Renders an anchor when `href` is provided.
 */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const setCursorActive = useUIStore((s) => s.setCursorActive);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setCursorActive(false);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 cursor-pointer select-none";
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_40px_-12px_rgba(91,124,255,0.7)]"
      : "text-ink border border-line hover:border-white/25 hover:text-white";

  const handleClick = () => {
    if (href?.startsWith("#")) scrollToSection(href);
    onClick?.();
  };

  const inner = (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={reset}
      onClick={handleClick}
      className={cn(base, styles, className)}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -z-10 rounded-full bg-accent-gradient" aria-hidden />
      )}
      {variant === "primary" && (
        <span
          className="absolute inset-0 -z-10 rounded-full bg-accent-gradient opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
          aria-hidden
        />
      )}
      {children}
    </motion.div>
  );

  if (href && !href.startsWith("#")) {
    return (
      <a href={href} aria-label={ariaLabel} className="inline-block">
        {inner}
      </a>
    );
  }

  return (
    <span role="button" aria-label={ariaLabel} tabIndex={0} className="inline-block"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {inner}
    </span>
  );
}
