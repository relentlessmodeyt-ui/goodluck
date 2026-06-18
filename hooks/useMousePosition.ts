"use client";

import { useEffect, useRef } from "react";

type Vec2 = { x: number; y: number };

/**
 * Tracks normalised pointer position (-1..1 on each axis) in a ref, so consumers
 * can read it inside animation frames without triggering React re-renders.
 */
export function useMousePosition() {
  const pos = useRef<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return pos;
}
