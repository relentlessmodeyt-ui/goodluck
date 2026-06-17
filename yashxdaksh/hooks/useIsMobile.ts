"use client";

import { useEffect, useState } from "react";

/** Returns true on coarse-pointer / small viewports — used to lighten the 3D scene. */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth < breakpoint ||
          window.matchMedia("(pointer: coarse)").matches
      );
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
