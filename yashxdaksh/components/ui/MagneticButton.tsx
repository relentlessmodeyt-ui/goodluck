"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  strength?: number;
  cursorLabel?: string;
  ariaLabel?: string;
}

const VARIANTS = {
  primary:
    "bg-accent-sheen bg-[length:200%_100%] text-base hover:bg-[position:100%_50%] shadow-[0_8px_40px_-12px_rgba(91,124,255,0.7)]",
  secondary:
    "glass text-ink hover:border-accent/40",
  ghost: "text-ink hover:text-accent",
} as const;

/**
 * Magnetic, spring-driven button. The element leans toward the pointer and the
 * label drifts slightly further for depth. Renders as <a> or <button>.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 0.4,
  cursorLabel,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursor = useStore((s) => s.setCursor);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setCursor("default");
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-[background-position,color,border-color] duration-500 ease-smooth cursor-pointer select-none";

  const inner = (
    <span className="inline-flex items-center gap-2">{children}</span>
  );

  const handlers = {
    onMouseMove: handleMove,
    onMouseEnter: () => cursorLabel && setCursor("hover", cursorLabel),
    onMouseLeave: reset,
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className="inline-block">
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          className={cn(base, VARIANTS[variant], className)}
          {...handlers}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn(base, VARIANTS[variant], className)}
          {...handlers}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
