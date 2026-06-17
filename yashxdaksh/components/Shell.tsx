"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Intro } from "@/components/ui/Intro";
import { Navbar } from "@/components/ui/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

/** Global chrome + smooth-scroll provider wrapping all page content. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Intro />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main">{children}</main>
    </SmoothScroll>
  );
}
