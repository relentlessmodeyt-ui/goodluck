"use client";

import { useEffect, useState } from "react";

/** Tracks the pointer position, normalized to -1..1 around the viewport center. */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return position;
}
