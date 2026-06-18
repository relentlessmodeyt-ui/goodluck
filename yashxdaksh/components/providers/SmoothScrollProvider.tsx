"use client";

import type { ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/** Initialises Lenis smooth scrolling for the whole document. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
